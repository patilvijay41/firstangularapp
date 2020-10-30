import { Component, OnInit, NgZone } from '@angular/core';
import { Routes, ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, FormControlName } from '@angular/forms';
declare let alertify:any;
import { UserService } from '../user.service';
import { find } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  formData:any;
  userList:any;
  status:boolean = false;
  constructor(private readonly fb: FormBuilder, private route:ActivatedRoute, private router:Router,
    private userService:UserService,private _ngZone:NgZone) { 
    this.loginForm = this.fb.group({
      username:['', Validators.required],
      password:['', Validators.required]
    })
  }
  get f() { return this.loginForm.controls; }

  isValidInput(fieldName): boolean {
    return this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched);
  }

  ngOnInit(): void {
  }

  submitForm() {
    this.formData = this.loginForm.getRawValue();
    var userDetails:any;
    this.userService.getUserList().subscribe(result => {
      this.userList = result;
      userDetails = this.userList.find(data1 => data1.username == this.formData.username );
      if(userDetails) {
        localStorage.setItem("userDetails",userDetails);
        this.router.navigateByUrl('/profile'); 
        alertify.success("Login successful!");
      } else {
        alertify.error("Username or password is incorrect!");
      }
    });
  }

  reditectToProfile() {
    this.router.navigate(['/profile']); 
  }

}
