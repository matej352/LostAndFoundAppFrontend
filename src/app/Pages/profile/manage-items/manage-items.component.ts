import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AdvertisementWithItem } from 'src/app/Models/AdvertisementWithItem';
import { QueryOptions } from 'src/app/Models/QueryOptions';
import { AdvertisementService } from 'src/app/Services/advertisement.service';
import { CheckIfLoggedInService } from 'src/app/Services/check-if-logged-in.service';

@Component({
  selector: 'app-manage-items',
  templateUrl: './manage-items.component.html',
  styleUrls: ['./manage-items.component.css']
})
export class ManageItemsComponent implements OnInit {

  public loggedInUsersUsername!: string;

  public found!: boolean;

  advertisements?:AdvertisementWithItem[];

  itemsCount?: number = 0;

  constructor(public checkIfLoggedInService: CheckIfLoggedInService,
     private router: Router, 
     private advertisementService: AdvertisementService,
     private sanitizer: DomSanitizer,
     private redirect: Router,) { }

  ngOnInit(): void {
    this.loggedInUsersUsername = this.getLoggedInUserName();

    this.getAllActiveAndExpiredCount();


  }

  async getAllActiveAndExpiredCount() {
    await this.advertisementService.getAllActiveAndExpiredCount().toPromise().then(
      res => {
        this.itemsCount = res; 
        let query = {startIndex: 0, endIndex: 6}
        this.getAllActiveAndExpired(query);
        
      });
  }

  async getAllActiveAndExpired(query: QueryOptions) {
    await this.advertisementService.getAll(query).toPromise().then(
      res => {
        this.advertisements = res;
        
      });
  }


  public prepareSource(data: string): SafeResourceUrl {
    const imagePath = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + data);
    return imagePath;
  }


  getLoggedInUserName(): any {
    return this.checkIfLoggedInService.getLoggedInUsersUsername();
  }





onDelete(id: number): void {
  this.advertisementService.deleteAdvertisement(id).toPromise().then(
    (res) => {
      this.redirect.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
        this.redirect.navigate(["/profile", this.loggedInUsersUsername,"manage", "items"]);
    })
    },
    
  );
}


  //get first 29 words of description to show
  public prepareShortDescription(description: string): string {
    var shortDescription;
    if (description.split(" ").length >= 30) {
      var index = this.getCharCount(description);
      shortDescription = description.substring(0, description.indexOf(" ", index)) + "...";
    } else {
      shortDescription = description;
    }

    return shortDescription;
  }

  getCharCount(description: string): number {
    var array = description.split(" ");
    var counter = 0;

    var till30 = 0;
    for (const word of array) {
      till30++;
      if (till30 == 30) {
        break;
      }
      counter++;
      var chars = word.split('');
      for (const char of chars) {
           counter++;
      }
         
    }
    counter--;
   
    return counter;
  }


  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (this.itemsCount && endIndex > this.itemsCount) {
        endIndex = this.itemsCount;
    }
    let query = {
      startIndex: startIndex,
      endIndex: endIndex
    };
    this.getAllActiveAndExpired(query);
  }


}
