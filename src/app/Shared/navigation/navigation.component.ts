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
  deviceXs!: boolean;

  constructor(
    public checkIfLoggedInService: CheckIfLoggedInService,
    private responsivityService: ResponsivityService,
    private uiService: UiService,
    private router: Router
  ) {
    this.mediaSubscription = responsivityService
      .onchange()
      .subscribe((boolValue) => (this.deviceXs = boolValue));
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.mediaSubscription.unsubscribe();
  }

  logOut() {
    localStorage.removeItem('jwt');
    this.checkIfLoggedInService.userAuthenticated(false);
  }

 
} 
