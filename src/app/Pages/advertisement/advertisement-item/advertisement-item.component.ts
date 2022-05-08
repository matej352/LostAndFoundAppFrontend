import { Image } from './../../../Models/Image';
import { Observable } from 'rxjs';
import { AdvertisementWithItem } from 'src/app/Models/AdvertisementWithItem';
import { AdvertisementService } from 'src/app/Services/advertisement.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-advertisement-item',
  templateUrl: './advertisement-item.component.html',
  styleUrls: ['./advertisement-item.component.css']
})
export class AdvertisementItemComponent implements OnInit {

  @Input()
  advertisementId!: number;

  adv$!: Observable<AdvertisementWithItem>;

  adv!: AdvertisementWithItem;
  
  imagePath!: SafeResourceUrl;

  image?: Image;

  constructor(private advertisementService: AdvertisementService, private router: Router, private sanitizer: DomSanitizer) {
    let currentUrl = this.router.url;
    this.advertisementId =  parseInt(currentUrl.split("/")[currentUrl.split("/").length -1]);
   
    advertisementService.getAdvertisementWithItem(this.advertisementId).subscribe( {
      next: (a) => {
        this.adv = a;
      },
      complete: () => {

        this.getImage(this.adv.item.itemId);

      }
    });

   }

  ngOnInit(): void {
  }

  private async getImage(itemId: number): Promise<void> {

    await this.advertisementService.getImageOfItem(itemId).toPromise().then(
      res => {
        this.image = res;
        this.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
        + this.image?.data);
      },
      err => {
        console.log(err.message);
        this.imagePath = "./../../../../assets/img/noImage.png";
      }
    );
 

  }

}
