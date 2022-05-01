import { CheckIfLoggedInService } from './../../Services/check-if-logged-in.service';
import { AuthService } from './../../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public SingInForm!: FormGroup;
  public SingUpForm!: FormGroup;
  loginFailed:boolean = false;
  errorMessage!: string

  constructor(private authService: AuthService,
              private router: Router,
              private checkIfLoggedInService: CheckIfLoggedInService) { }

  ngOnInit(): void {

    this.SingInForm = new FormGroup({
      Username: new FormControl('', {validators: [Validators.required]}),
      Password: new FormControl('',{validators: [Validators.required, Validators.minLength(8)]}),
    });

    this.SingUpForm = new FormGroup({
      Username: new FormControl('', {validators: [Validators.required]}),
      Password: new FormControl('',{validators: [Validators.required, Validators.minLength(8)]}),
     
    });

  }

  public error = (controlName: string, errorName: string) => {
    return this.SingInForm.controls[controlName].hasError(errorName);
  }



  signIn() {

    console.log(this.SingInForm.value);

  

    this.authService.loginUser(this.SingInForm.value)
    .subscribe({
      next: response => {
        const jwt = response.token;
  
        localStorage.setItem("jwt", jwt);

        this.checkIfLoggedInService.userAuthenticated(true);
        
        this.router.navigate(["/home"]);
  
      },
      error: err => {
        this.loginFailed = true;
        console.log(err)
        this.errorMessage = err.error 
      }
    })



  }

  

}
