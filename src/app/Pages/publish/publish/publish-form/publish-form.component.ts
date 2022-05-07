import { Category } from './../../../../Models/Category';
import { Observable } from 'rxjs';
import { CategoryService } from './../../../../Services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-publish-form',
  templateUrl: './publish-form.component.html',
  styleUrls: ['./publish-form.component.css']
})
export class PublishFormComponent implements OnInit {

  radio: string = "lost";

  categories$!: Observable<Category[]>

  public publishForm!: FormGroup;

  fileName: string = '';


  constructor(private categoryService: CategoryService,
              public formBuilder: FormBuilder, private http: HttpClient ) { 

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
    console.log(this.publishForm.value)

  }


  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    if (file) {

        this.fileName = file.name;
        const formData = new FormData();
        formData.append("thumbnail", file);

        console.log(formData);

        const upload$ = this.http.post("https://localhost:44326/api/image", formData);

        upload$.subscribe();
    }

  }



  dohvati() {
    const upload$ = this.http.get("https://localhost:44326/api/image");
  }

}
