import { Category } from './../../../../Models/Category';
import { Observable } from 'rxjs';
import { CategoryService } from './../../../../Services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-publish-form',
  templateUrl: './publish-form.component.html',
  styleUrls: ['./publish-form.component.css']
})
export class PublishFormComponent implements OnInit {

  radio: string = "lost";

  categories$!: Observable<Category[]>

  public publishForm!: FormGroup;


  constructor(private categoryService: CategoryService,
              public formBuilder: FormBuilder ) { 

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

}
