import { UiService } from './../../../Services/ui.service';
import { ValidatorsStoreService } from './../../../Validators/validators-store.service';
import { CheckIfLoggedInService } from './../../../Services/check-if-logged-in.service';
import { AuthService } from './../../../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public SingInForm!: FormGroup;
  public RegisterForm!: FormGroup;

  loginFailed:boolean = false;
  registerFailed:boolean = false;

  errorMessageLogin!: string
  errorMessageRegister!: string

  constructor(private authService: AuthService,
              private router: Router,
              private checkIfLoggedInService: CheckIfLoggedInService,
              private validatorsStore: ValidatorsStoreService,
              private uiService: UiService) { }

  ngOnInit(): void {

    this.createSignInForm();
    this.createSignUpForm();

  }

  //#region [Setup]

  private createSignInForm(): void {
    this.SingInForm = new FormGroup({
      Username: new FormControl('', {validators: [Validators.required]}),
      Password: new FormControl('',{validators: [Validators.required, Validators.minLength(8)]}),
    });
  }

  private createSignUpForm(): void {
    this.RegisterForm = new FormGroup({
      Username: new FormControl('', {validators: [Validators.required]}),
      FirstName: new FormControl('', {validators: [Validators.required]}),
      LastName: new FormControl('', {validators: [Validators.required]}),
      Email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      PhoneNumber: new FormControl('', {validators: [Validators.required, Validators.pattern('[0-9]+')]}),
      Password: new FormControl('',{validators: [Validators.required, Validators.minLength(8)]}),
      ConfirmPassword: new FormControl('',{validators: [Validators.required, Validators.minLength(8)]}),
    
     
    });
  }


  //#endregion


  public signInError = (controlName: string, errorName: string) => {
    return this.SingInForm.controls[controlName].hasError(errorName);
  }

  public signUpError = (controlName: string, errorName: string) => {
    return this.RegisterForm.controls[controlName].hasError(errorName);
  }

  //#region [Actions]

  public signIn() {

    this.authService.loginUser(this.SingInForm.value)
    .subscribe({
      next: response => {
        const jwt = response.token;
  
        localStorage.setItem("jwt", jwt);

        this.checkIfLoggedInService.userAuthenticated(true);
        
        //for updating ui of navigation
        this.uiService.userLoggedIn();

        this.router.navigate(["/home"]);
  
      },
      error: err => {
        this.loginFailed = true;
        this.errorMessageLogin = err.error 
      }
    })
  }

  public signUp() {

    this.authService.registerUser(this.RegisterForm.value)
    .subscribe({
      next: response => {
        this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/login']);
      });
      },
      error: err => {
        this.registerFailed = true;
        this.errorMessageRegister = err.error.detail 
      }
    })

  }

  //#endregion
}
