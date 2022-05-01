import { UserLogin } from './../Models/UserLogin';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private restApiUrl = "https://localhost:44326"; 

  constructor(private http: HttpClient) { 
  
  }


  loginUser(user: UserLogin): Observable<any> {
    return this.http.post<any>( `${this.restApiUrl}/auth/login`, user);
  }
}
