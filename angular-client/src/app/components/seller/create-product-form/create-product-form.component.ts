import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  added = false;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
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
    let body = new FormData();
    body.append('title', this.productForm.title);
    body.append('categoryId', this.productForm.categoryId);
    body.append('myFile', this.productForm.filename);
    body.append('description', this.productForm.description);
    body.append('price', this.productForm.price);
    this.productService.createProduct(body).subscribe(
      (resp) => {
        this.added = true;
        console.log(resp);
        f.resetForm();
        setTimeout(() => {
          this.router.navigate(['seller', 'products']);
        }, 500);
      },
      (err) => {
        this.added = false;
      }
    );
  }
}
