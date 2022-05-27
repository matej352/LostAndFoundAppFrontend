import { AccountService } from 'src/app/Services/account.service';
import { UiService } from './../../../Services/ui.service';
import { ValidatorsStoreService } from './../../../Validators/validators-store.service';
import { CheckIfLoggedInService } from './../../../Services/check-if-logged-in.service';
import { AuthService } from './../../../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { HubConnection, HubConnectionBuilder, LogLevel, HttpTransportType } from '@aspnet/signalr';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


 // hubConnection!: HubConnection;


  public SingInForm!: FormGroup;
  public RegisterForm!: FormGroup;

  enteredUsername!: string;
  connId!: string;

  loginFailed:boolean = false;
  registerFailed:boolean = false;

  errorMessageLogin!: string
  errorMessageRegister!: string

  constructor(private authService: AuthService,
              private router: Router,
              private checkIfLoggedInService: CheckIfLoggedInService,
              private validatorsStoreService: ValidatorsStoreService,
              private uiService: UiService,
              public accountService: AccountService,
              public formBuilder: FormBuilder,
             ) { }

  ngOnInit(): void {

    /*this.hubConnection = new HubConnectionBuilder()
    .withUrl("https://localhost:44326/chat", {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets
    })
    .build(); */

    this.createSignInForm();
    this.createSignUpForm();

  }

  //#region [Setup]

  private createSignInForm(): void {
    this.SingInForm = this.formBuilder.group({
      Username: new FormControl('', {validators: [Validators.required, Validators.maxLength(50)]}),
      Password: new FormControl('',{validators: [Validators.required, Validators.minLength(8)]}),
    });
  }

  private createSignUpForm(): void {
    this.RegisterForm = new FormGroup(
      {
      Username: new FormControl('', {validators: [Validators.required, Validators.maxLength(50)]}),
      FirstName: new FormControl('', {validators: [Validators.required, Validators.maxLength(50)]}),
      LastName: new FormControl('', {validators: [Validators.required, Validators.maxLength(50)]}),
      Email: new FormControl('', {validators: [Validators.required, Validators.email, Validators.maxLength(50)]}),
      PhoneNumber: new FormControl('', {validators: [Validators.required, Validators.pattern('[0-9]+')]}),
      Password: new FormControl('',{validators: [Validators.required, Validators.minLength(8)]}),
      ConfirmPassword: new FormControl('',{validators: [Validators.required, Validators.minLength(8)]}),
     },
     
     [ValidatorsStoreService.mustMatch('Password', 'ConfirmPassword')]
     
     );


  }


 passwordMatchError() {
    return (
      this.RegisterForm.getError('mismatch') &&
      this.RegisterForm.get('ConfirmPassword')?.touched
    );
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

    this.enteredUsername = this.SingInForm.get('Username')?.value;

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

 /* saveConnId(connId: string, username: string) {
      console.log(connId + " " + this.enteredUsername)
      this.accountService.saveConnId(connId, username).subscribe();
  } */



  //#endregion
}




