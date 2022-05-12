import { UiService } from './../../Services/ui.service';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CheckIfLoggedInService } from 'src/app/Services/check-if-logged-in.service';
import { ResponsivityService } from 'src/app/Services/responsivity.service';
import { Router } from '@angular/router';

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

  constructor(
    public checkIfLoggedInService: CheckIfLoggedInService,
    private responsivityService: ResponsivityService,
    private uiService: UiService,
    private router: Router
  ) {
    this.mediaSubscription = responsivityService
      .onchange()
      .subscribe((boolValue) => (this.deviceXs = boolValue));

    this.uiSubscription = uiService.onUserLoggIn().subscribe( () => this.loggedInUsersUsername = this.getLoggedInUserName());
  }

  ngOnInit(): void {
    this.loggedInUsersUsername = this.getLoggedInUserName()
  }

  ngOnDestroy() {
    this.mediaSubscription.unsubscribe();
    this.uiSubscription.unsubscribe();
  }

  logOut() {
    localStorage.removeItem('jwt');
    this.checkIfLoggedInService.userAuthenticated(false);
  }

  getLoggedInUserName(): any {
      return this.checkIfLoggedInService.getLoggedInUsersUsername();
  }



 
} 
