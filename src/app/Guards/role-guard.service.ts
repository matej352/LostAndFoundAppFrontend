import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private router: Router, private jwtHelper: JwtHelperService) { }

  canActivate() {
    const token = localStorage.getItem("jwt");

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      
      //decode token to get role value
      const tokenClaims = JSON.parse(window.atob(token.split('.')[1]));
      var role =  tokenClaims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      if (role == "Admin") {
        return true;
      } else {
        return false;
      }

    }
    
    if(token) {
      localStorage.removeItem("jwt");
    }
    this.router.navigate(["login"]);
    return false;
  }
}