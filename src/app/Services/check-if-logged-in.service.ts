import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class CheckIfLoggedInService {


  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(public jwtHelper: JwtHelperService) { 
    const token = localStorage.getItem("jwt");
    
    //provjera je li valjan
    if (token) {
      if (this.jwtHelper.isTokenExpired(token)) {
          localStorage.removeItem("jwt");
          this._isLoggedIn$.next(false);
      } else {
        this._isLoggedIn$.next(!!token);
      }
    }
   
    this._isLoggedIn$.next(!!token);
  }

  userAuthenticated(status: boolean) {
    this._isLoggedIn$.next(status);
  }


}
