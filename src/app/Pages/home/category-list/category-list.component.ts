import { Category } from './../../../Models/Category';
import { Observable } from 'rxjs';
import { CategoryService } from './../../../Services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories$!: Observable<Category[]>;

  constructor(private categoryService: CategoryService) { 
    this.categories$ = categoryService.getAll();
  }

  ngOnInit(): void {
  }

}
