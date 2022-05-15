import { Route, Router } from '@angular/router';
import { ImageService } from './../../../../Services/image.service';
import { ItemService } from './../../../../Services/item.service';
import { AdvertisementService } from 'src/app/Services/advertisement.service';
import { Category } from './../../../../Models/Category';
import { Observable } from 'rxjs';
import { CategoryService } from './../../../../Services/category.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Advertisement } from 'src/app/Models/Advertisement';
import { Item } from 'src/app/Models/Item';

@Component({
  selector: 'app-publish-form',
  templateUrl: './publish-form.component.html',
  styleUrls: ['./publish-form.component.css']
})
export class PublishFormComponent implements OnInit {

  @Input()
  loggedInUsersUsername!: string;

  radio: string = "lost";

  categories$!: Observable<Category[]>

  formData!: FormData;


  advertisement?: Advertisement;
  item?: Item;

  public publishForm!: FormGroup;

  fileName: string = '';


  constructor(private categoryService: CategoryService,
              public formBuilder: FormBuilder, private http: HttpClient,
              private advertisementService: AdvertisementService,
              private itemService: ItemService,
              private imageService: ImageService,
              private redirect: Router) { 

      this.categories$ = categoryService.getAll();


      this.publishForm = this.formBuilder.group({
        lostOrFound:['lost'],
        title:[''],
        description:[''],
        lossOrFoundDate:[''],
        category:['']
      })

  }

  ngOnInit(): void {
   
  }


  publish() {

    //first create advertisement
    this.createAdvertisement();

    

  }


  async createAdvertisement() {
    let newAdvertisement = {
        username: this.loggedInUsersUsername,
        lost: this.publishForm.get('lostOrFound')?.value == "lost" ? 1 : 0,
        found: this.publishForm.get('lostOrFound')?.value == "found" ? 1 : 0
    };
    
    await this.advertisementService.create(newAdvertisement, this.loggedInUsersUsername).toPromise().then(
      res => {
        this.advertisement = res;

        //then create item
        this.createItem();
        
      },
      err => {
        console.log(err);
      }
    );

  }

  createItem() {
    let newItem = {
      title: this.publishForm.get('title')?.value,
      description: this.publishForm.get('description')?.value,
      findingDate: this.publishForm.get('lostOrFound')?.value == "lost" ? null : this.publishForm.get('lossOrFoundDate')?.value,
      lossDate: this.publishForm.get('lostOrFound')?.value == "found" ? null : this.publishForm.get('lossOrFoundDate')?.value,
      advertisementId: this.advertisement?.advertisementId,
      categoryId: this.publishForm.get('category')?.value
    }

    this.itemService.create(newItem).toPromise().then(
      res => {
        this.item = res;

        //then create image (if provided)
        if (this.fileName) {
          this.saveImage();

        }  
      },
      err => {
        console.log(err);
      }
    );
  }

  saveImage() {

    this.imageService.create(this.formData, this.item?.itemId).subscribe( res => this.redirect.navigate(['/home']));
  }


  

  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    if (file) {

        this.fileName = file.name;
        this.formData = new FormData();
        this.formData.append("thumbnail", file);
    }

  }


}


