import { UiService } from './../../Services/ui.service';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CheckIfLoggedInService } from 'src/app/Services/check-if-logged-in.service';
import { ResponsivityService } from 'src/app/Services/responsivity.service';
import { Router } from '@angular/router';
import { Role } from 'src/app/Enums/Role';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  mediaSubscription!: Subscription;

  uiSubscription!: Subscription;

  deviceXs!: boolean;

  public loggedInUsersUsername!: string;
  public loggedInUsersRole!: string;

  constructor(
    public checkIfLoggedInService: CheckIfLoggedInService,
    private responsivityService: ResponsivityService,
    private uiService: UiService,
    private router: Router
  ) {
    this.mediaSubscription = responsivityService
      .onchange()
      .subscribe((boolValue) => (this.deviceXs = boolValue));

    this.uiSubscription = uiService.onUserLoggIn().subscribe( () => {
      this.loggedInUsersUsername = this.getLoggedInUserName();
      this.loggedInUsersRole = this.getLoggedInUserRole();
    });
  }

  ngOnInit(): void {
    this.loggedInUsersUsername = this.getLoggedInUserName();
    this.loggedInUsersRole = this.getLoggedInUserRole();
  }

  ngOnDestroy() {
    this.mediaSubscription.unsubscribe();
    this.uiSubscription.unsubscribe();
  }

  logOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('connectionId');
    this.checkIfLoggedInService.userAuthenticated(false);
  }

  getLoggedInUserName(): any {
      return this.checkIfLoggedInService.getLoggedInUsersUsername();
  }

  getLoggedInUserRole(): any {
    return this.checkIfLoggedInService.getLoggedInUsersRole();
  }

  navigateHome(): void {
    this.router.navigateByUrl('/404', { skipLocationChange: true }).then(() => {
      this.router.navigate(["/home"]);
  })
  }

  check(): string {
    return "Admin";
  }



 
} 
