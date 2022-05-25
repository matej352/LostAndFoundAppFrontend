import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AdvertisementWithItem } from 'src/app/Models/AdvertisementWithItem';
import { AdvertisementService } from 'src/app/Services/advertisement.service';
import { CheckIfLoggedInService } from 'src/app/Services/check-if-logged-in.service';

@Component({
  selector: 'app-inactive-items',
  templateUrl: './inactive-items.component.html',
  styleUrls: ['./inactive-items.component.css']
})
export class InactiveItemsComponent implements OnInit {

  public loggedInUsersUsername!: string;

  public found!: boolean;

  advertisements!:AdvertisementWithItem[];

  itemsCount: number = 0;

  constructor(public checkIfLoggedInService: CheckIfLoggedInService,
     private router: Router, 
     private advertisementService: AdvertisementService,
     private sanitizer: DomSanitizer,
     private redirect: Router,) { }

  ngOnInit(): void {
    this.loggedInUsersUsername = this.getLoggedInUserName();
  
    this.advertisementService.getAllInactiveFromUser(this.loggedInUsersUsername).subscribe({
      next: (res) => {
        this.advertisements = res
      },
      complete: () => {
          this.itemsCount = this.advertisements.length;
      }

      
    });

  }


  public prepareSource(data: string): SafeResourceUrl {
    const imagePath = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + data);
    return imagePath;
  }


  getLoggedInUserName(): any {
    return this.checkIfLoggedInService.getLoggedInUsersUsername();
  }





onReactivate(id: number): void {

  this.advertisementService.reactivateAdv(id).toPromise().then(
    (res) => {
     
      this.redirect.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
        this.redirect.navigate(["/profile", this.loggedInUsersUsername,"items", "unactive"]);
    })
    }
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

}
