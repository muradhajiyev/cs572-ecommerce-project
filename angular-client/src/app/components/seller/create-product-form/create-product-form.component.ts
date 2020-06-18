import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models';
import { ProductForm } from 'src/app/models/product-form';
import { ProductService } from 'src/app/services/product.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'create-product-form',
  templateUrl: './create-product-form.component.html',
  styleUrls: ['./create-product-form.component.css'],
})
export class CreateProductForm implements OnInit {
  productForm = new ProductForm();
  category: Array<Category>;
  debug = 'Empty';

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.category = categories.result;
    });
  }

  fileEvent(event) {
    const fileName = event.target.files[0];
    this.productForm.filename = fileName;
    console.log(fileName);
  }

  onSubmitForm(f) {
    this.debug = `${this.productForm}`;
    let body = new FormData();
    body.append('title', this.productForm.title);
    body.append('categoryId', this.productForm.categoryId);
    body.append('myFile', this.productForm.filename);
    body.append('description', this.productForm.description);
    body.append('price', this.productForm.price);
    this.productService.createProduct(body).subscribe(
      (resp) => {
        this.debug = 'added prduct';
        console.log(resp);
      },
      (err) => {
        this.debug = err;
      }
    );
    console.log('Form Values ' + f[0]);
  }
}
