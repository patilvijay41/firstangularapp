import { Component, OnInit } from '@angular/core';
import { Routes, ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, FormControlName } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
declare let alertify:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private readonly fb: FormBuilder, private route:ActivatedRoute, private router:Router) { 
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
    console.log(this.loginForm.getRawValue());
    alertify.success("LoggedIn Successful!");
    this.router.navigate(['/profile']);
  }

}
