import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models';
import { ProductForm } from 'src/app/models/product-form';

@Component({
  selector: 'create-product-form',
  templateUrl: './create-product-form.component.html',
  styleUrls: ['./create-product-form.component.css'],
})
export class CreateProductForm implements OnInit {
  productForm = new ProductForm();
  category: Array<Category>;
  debug = 'Empty';
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.category = categories.result;
    });
  }

  onSubmitForm(f) {
    this.debug = `${this.productForm}`;
    console.log('Form Values ' + f);
  }
}
