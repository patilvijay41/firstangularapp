import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl:string = "./assets/users.json";
  constructor(private http:HttpClient) { 

  }

  getUserList() {
    return this.http.get(this.apiUrl);
  }

}
