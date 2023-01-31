import { AccountUpdateDTO } from './../../../DTOs/AccountUpdateDTO';
import { Account } from 'src/app/Models/Account';
import { AccountService } from 'src/app/Services/account.service';
import { Component, OnInit } from '@angular/core';
import { QueryOptions } from 'src/app/Models/QueryOptions';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CheckIfLoggedInService } from 'src/app/Services/check-if-logged-in.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-manage-accounts',
  templateUrl: './manage-accounts.component.html',
  styleUrls: ['./manage-accounts.component.css']
})
export class ManageAccountsComponent implements OnInit {

  accCount?: number;
  loggedInUsersUsername!: string;

  accounts!: Account[];
  dataSource!: any;

  displayedColumns: string[] = ['accountId', 'username', 'firstName', 'lastName', 'phoneNumber', 'email', 'role', 'active'];

  constructor(private accountService: AccountService,  private redirect: Router, public checkIfLoggedInService: CheckIfLoggedInService,) { }

  ngOnInit(): void {
    this.getAllAccountsCount();
    this.loggedInUsersUsername = this.getLoggedInUserName()
  }

  async getAllAccountsCount() {
    await this.accountService.getAllAccountsCount().toPromise().then(
      res => {
        this.accCount = res; 
        let query = {startIndex: 0, endIndex: 10}
        this.getAllAccounts(query);
        
      });
  }
  
  async getAllAccounts(query: QueryOptions) {
    await this.accountService.getAllAccounts(query).toPromise().then(
      res => {
        var helper = res as Account[];
        this.accounts = helper; 

        this.dataSource = new MatTableDataSource(this.accounts); 
      });
  }

  deactivate(accountId: number): void {
    const account = this.accounts.filter(a => a.accountId == accountId)[0];
    
    let dto = {
      accountId: account.accountId,
      username: account.username,
      phoneNumber: account.phoneNumber,
      email: account.email,
      firstName: account.firstName,
      lastName: account.lastName,
      active: 0
    }

    this.updateAccount(dto);

  }

  reactivate(accountId: number): void {
    const account = this.accounts.filter(a => a.accountId == accountId)[0];
    
    let dto = {
      accountId: account.accountId,
      username: account.username,
      phoneNumber: account.phoneNumber,
      email: account.email,
      firstName: account.firstName,
      lastName: account.lastName,
      active: 1
    }

    this.updateAccount(dto);

  }

  updateAccount(account: AccountUpdateDTO): void {
    this.accountService.updateAccount(account).subscribe({
      next: () => {
        this.redirect.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.redirect.navigate(["/profile", this.loggedInUsersUsername,"manage", "accounts"]);
      })
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getLoggedInUserName(): any {
    return this.checkIfLoggedInService.getLoggedInUsersUsername();
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (this.accCount && endIndex > this.accCount) {
        endIndex = this.accCount;
    }
    let query = {
      startIndex: startIndex,
      endIndex: endIndex
    };
    this.getAllAccounts(query);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  } 




}



