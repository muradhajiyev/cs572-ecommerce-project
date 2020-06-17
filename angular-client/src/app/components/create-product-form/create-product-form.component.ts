import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'create-product-form',
  templateUrl: './create-product-form.component.html',
  styleUrls: ['./create-product-form.component.css'],
})
export class CreateProductForm implements OnInit {
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      console.log('CATEGORY : ' + categories);
    });
  }
}
