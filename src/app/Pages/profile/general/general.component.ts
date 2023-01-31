import {  Router, ActivatedRoute } from '@angular/router';
import { Account } from './../../../Models/Account';
import { AccountService } from './../../../Services/account.service';
import { Component, createPlatform, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CheckIfLoggedInService } from 'src/app/Services/check-if-logged-in.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  loggedInUsersUsername!: string;

  public profileUpdateForm!: FormGroup;

  public is_disabled: boolean = true;

  public account?: Account;

  constructor(public checkIfLoggedInService: CheckIfLoggedInService,
              public accountService: AccountService,
              private redirect: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.loggedInUsersUsername = this.getLoggedInUserName()
    this.getAccount(this.loggedInUsersUsername);

  }




  createUpdateForm(): void {
    this.profileUpdateForm = new FormGroup({
      firstName: new FormControl(this.account?.firstName,{validators: [Validators.required,  Validators.maxLength(50)]}),
      lastName: new FormControl(this.account?.lastName, {validators: [Validators.required,  Validators.maxLength(50)]}),
      phoneNumber: new FormControl(this.account?.phoneNumber, {validators: [Validators.required, Validators.pattern('[0-9]+')]}),
      email: new FormControl(this.account?.email, {validators: [Validators.required, Validators.email, Validators.maxLength(50)]}),
    })
  }



  public wantUpdate(): void {
    this.createUpdateForm();
    this.is_disabled = false;
  }



  getLoggedInUserName(): any {
    return this.checkIfLoggedInService.getLoggedInUsersUsername();
  }

  
  private async getAccount(username: string): Promise<void> {

    await this.accountService.getAccount(username).toPromise().then(
      res => {
        this.account = res;
      }
    );
  }



  onSubmit() {

    //added property to object
    this.profileUpdateForm.value.accountId = this.account?.accountId;
    this.profileUpdateForm.value.username = this.loggedInUsersUsername;
    this.profileUpdateForm.value.active = this.account?.active;

    if (this.account?.accountId) {

      this.accountService.updateAccount(this.profileUpdateForm.value).subscribe({
        next: () => {
          this.redirect.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.redirect.navigate(["/profile", this.loggedInUsersUsername]);
        })
        },
        error: (err) => {
          console.log(err);
        }
      })

    }


  }



}
