import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CheckIfLoggedInService } from 'src/app/Services/check-if-logged-in.service';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {

  public loggedInUsersUsername!: string;

  constructor(public checkIfLoggedInService: CheckIfLoggedInService) { }

  ngOnInit(): void {
    this.loggedInUsersUsername = this.getLoggedInUserName()
  }


  getLoggedInUserName(): any {
    return this.checkIfLoggedInService.getLoggedInUsersUsername();
  }

}
