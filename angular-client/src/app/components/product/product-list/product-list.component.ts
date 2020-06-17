import { Component, OnInit, Input, AfterContentChecked } from '@angular/core';
import { Product } from 'src/app/models';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: '[app-product-list]',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageSize: number = 3;

  pageNumber: number = 1;
  maxPageNumber: number = 1;
  pages: number[] = [];
  products: Product[] = [];
  _currentCategory: string;
  
  set currentCategory(currentCategory: string) {
    this._currentCategory = currentCategory;
    this.refreshProducts();
  }

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {
    route.queryParams.subscribe(queryParams => { 
      if(queryParams['page']){
        this.selectPage(+queryParams['page']); 
      }else{
        this.selectPage(1);
      }
      this.currentCategory = queryParams['cat'];
    });
  }
  navigateToProductList(){
    // changes the route without moving from the current view or
    // triggering a navigation event,
    this.router.navigate([], {
     queryParams: {
       newOrdNum: '123'
     },
     queryParamsHandling: 'merge',
     // preserve the existing query params in the route
     skipLocationChange: true
     // do not trigger navigation
   });
  }

  selectPage(p) {
    this.pageNumber = p;
    this.refreshProducts();
  }

  ngOnInit(): void {
    this.refreshProducts();
  }
  refreshProducts() {
    this.productService.getProducts(this._currentCategory, this.pageNumber, this.pageSize).subscribe(products => {
      console.log(products);
      this.pages = [];
      this.pageNumber = +products.result.currentPage;
      this.maxPageNumber = +products.result.pages;
      let i = 1;
      let m = 3;
      for (i; i <= m && i <= this.maxPageNumber; i++) {
        if (i < this.pageNumber && this.maxPageNumber > this.pageNumber) {
          i = this.pageNumber - 1;
          m = i + 2;
        }
        this.pages.push(i);
      }
      this.products = products.result.items;
    });
  }


}
