import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckIfLoggedInService {


  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor() { 
    const token = localStorage.getItem("jwt");
    this._isLoggedIn$.next(!!token);
  }

  userAuthenticated(status: boolean) {
    this._isLoggedIn$.next(status);
  }


}
