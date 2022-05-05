import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CheckIfLoggedInService } from 'src/app/Services/check-if-logged-in.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(public checkIfLoggedInService: CheckIfLoggedInService) { 
   
  }

  ngOnInit(): void {
  }



  logOut() {
    localStorage.removeItem("jwt");
    this.checkIfLoggedInService.userAuthenticated(false);
  }

}
