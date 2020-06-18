import {Component, OnInit} from '@angular/core';
import {BuyerService} from "../../../services/buyer.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  public shoppingCartProducts: any = [];
  public headerTitles = ['Product', 'Quantity', 'Price', 'Actions'];
  public totalPrice: number = 0;

  constructor(private _buyerService: BuyerService) {
  }

  ngOnInit(): void {
    this.getShoppingCart();
  }

  public getShoppingCart() {
    this._buyerService.getShoppingCart().subscribe(
      (shoppingCartList: any) => {
        this.shoppingCartProducts = shoppingCartList['result'];
        this.getTotalPrice();
      },
      (err) => {
        console.log("can't get shopping cart");
      }
    );
  }

  public removeProductFromShoppingCart(productIdString) {
    this._buyerService.removeProductFromShoppingCart(productIdString).subscribe(
      () => {
        this.shoppingCartProducts = this.shoppingCartProducts.filter(product => {
          return product.productId._id != productIdString;
        });
        console.log("product removed from shopping cart");
      },
      (err) => {
        console.log("can't remove product from shopping cart");
      }
    );
  }

  public getTotalPrice() {
    this.totalPrice = 0;
    this.shoppingCartProducts.map(product => {
      this.totalPrice += (product.quantity * product.productId.price);
    });
  }

  public updateShoppingCart(productId, quantity) {
    const productIdString = productId.toString();
    this._buyerService.updateShoppingCart(productIdString, quantity).subscribe(
      () => {
        console.log("product updated in shopping cart");
      },
      (err) => {
        console.log("can't update product in shopping cart");
      }
    );
  }

  public checkQuantityValidation() {
    for (let i = 0; i < this.shoppingCartProducts.length; i++) {
      if(this.shoppingCartProducts[i].quantity <= 0){
        return false;
      }
    }
    return true;
  }
}
