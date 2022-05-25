import { AccountService } from 'src/app/Services/account.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, Observable } from 'rxjs';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { CheckIfLoggedInService } from 'src/app/Services/check-if-logged-in.service';
import { Account } from 'src/app/Models/Account';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  account$!: Observable<Account>;

  public loggedInUsersUsername!: string;


  constructor(private observer: BreakpointObserver, public checkIfLoggedInService: CheckIfLoggedInService, private accountService: AccountService) {}

  ngOnInit(): void {
    this.loggedInUsersUsername = this.getLoggedInUserName()
    this.getAcount(this.loggedInUsersUsername);

  }


  getLoggedInUserName(): any {
    return this.checkIfLoggedInService.getLoggedInUsersUsername();
  }

  getAcount(username: string) {
    this.account$ = this.accountService.getAccount(username);
  }


  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }
}
