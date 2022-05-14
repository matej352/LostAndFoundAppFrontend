import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CheckIfLoggedInService } from 'src/app/Services/check-if-logged-in.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  public loggedInUsersUsername!: string;

  public found!: boolean;

  constructor(public checkIfLoggedInService: CheckIfLoggedInService, private router: Router) { }

  ngOnInit(): void {
    this.loggedInUsersUsername = this.getLoggedInUserName();
    this.found = this.checkLostOrFound();

  }

  getLoggedInUserName(): any {
    return this.checkIfLoggedInService.getLoggedInUsersUsername();
  }


  private checkLostOrFound(): boolean {
    const found = this.router.url.match("found");
    if (found) {
      return true;
    }
    return false;
  }

}
