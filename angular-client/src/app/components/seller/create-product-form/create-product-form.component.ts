import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models';
import { ProductForm } from 'src/app/models/product-form';
import { ProductService } from 'src/app/services/product.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'create-product-form',
  templateUrl: './create-product-form.component.html',
  styleUrls: ['./create-product-form.component.css'],
})
export class CreateProductForm implements OnInit {
  idProduct: string;
  productForm = new ProductForm();
  category: Array<Category>;
  added = false;
  dataForm = new FormGroup({
    //  filename: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.idProduct = this.route.snapshot.params['id'];

    //edit product
    if (this.idProduct) {
      console.log(this.idProduct);
      this.productService.getProductDetails(this.idProduct).subscribe(product => {
        let pResult = product.result;
        console.log(`Result : ${JSON.stringify(pResult)}`);

        this.dataForm = this.fb.group({
          categoryId: [pResult.categoryId, Validators.required],
          title: [pResult.title, Validators.required],
          price: [pResult.price, Validators.required],
          description: [pResult.description, Validators.required]
        });
        this.productForm.categoryId = pResult.categoryId;
        this.productForm.price = `${pResult.price}`;
        this.productForm.title = pResult.title;
        this.productForm.description = pResult.description;

      })

    }

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
    body.append('price', `${this.productForm.price}`);

    if (this.idProduct) {
      console.log("Product  +" + JSON.stringify(this.productForm));

      this.productService.editProduct(this.idProduct, body).subscribe((resp) => {
        this.added = true;
        console.log(resp);
        f.resetForm();
        setTimeout(() => {
          this.router.navigate(['seller', 'products']);
        }, 500);
      }, (err) => {
        this.added = false;
      })


    } else {
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
}
