import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CheckIfLoggedInService } from 'src/app/Services/check-if-logged-in.service';
import { AdvertisementService } from 'src/app/Services/advertisement.service';
import { Observable } from 'rxjs';
import { AdvertisementWithItem } from 'src/app/Models/AdvertisementWithItem';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  public loggedInUsersUsername!: string;

  public found!: boolean;

  advertisements!:AdvertisementWithItem[];

  lostItemsCount: number = 0;
  foundItemsCount: number = 0;

  constructor(public checkIfLoggedInService: CheckIfLoggedInService,
     private router: Router, 
     private advertisementService: AdvertisementService,
     private sanitizer: DomSanitizer,
     private redirect: Router,) { }

  ngOnInit(): void {
    this.loggedInUsersUsername = this.getLoggedInUserName();
    this.found = this.checkLostOrFound();
    this.advertisementService.getAllFromUser(this.loggedInUsersUsername).subscribe({
      next: (res) => {
        this.advertisements = res
      },
      complete: () => {
          this.lostItemsCount = this.advertisements.filter(a => a.lost == 1).length;
          this.foundItemsCount = this.advertisements.filter(a => a.found == 1).length;
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


  private checkLostOrFound(): boolean {
    const found = this.router.url.match("found");
    if (found) {
      return true;
    }
    return false;
  }






changeStatus(id: number, status: string, cameFrom: string): void {

  //case if user clicks on already used status
  if (cameFrom == "active" && status == "1") {
    return;
  }
  if (cameFrom == "resolved" && status == "0") {
    return;
  }

  this.advertisementService.changeAdvStatus(id).toPromise().then(
    () => {
      const pathLostOrFound = this.found ? 'found' : 'lost';
      this.redirect.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
        this.redirect.navigate(["/profile", this.loggedInUsersUsername,"items", pathLostOrFound]);
    })
    }
  );




}







}
