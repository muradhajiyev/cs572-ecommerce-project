import { Component, OnInit } from '@angular/core';
import { BuyerService } from 'src/app/services/buyer.service';
import { Address, BillingInfo } from 'src/app/models';
import { AddressService } from 'src/app/services/address.service';
import { BillingInfoService } from 'src/app/services/billing-info.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-checkout',
  templateUrl: './order-checkout.component.html',
  styleUrls: ['./order-checkout.component.css']
})
export class OrderCheckoutComponent implements OnInit {
  public shoppingCartProducts: any = [];
  public totalPrice: number = 0;
  public availablePoints: number = 0;
  addresses: Address[] = [];
  myBillingInfos: BillingInfo[] = [];
  //{cashbackPayment: 10, shippingAddressId: 'fdafr32rf545423', billingInfoId: 'fdfr874632das5',  }
  dataForm = new FormGroup({
    cashbackPayment: new FormControl(0, Validators.required),
    shippingAddressId: new FormControl('', Validators.required),
    billingInfoId: new FormControl('', Validators.required)
  });

  constructor(private _buyerService: BuyerService, private _addressService: AddressService, private _billingInfoService: BillingInfoService,
    private _orderService: OrderService, private _router: Router) {
  }

  ngOnInit(): void {
    this.getShoppingCart();
    this.refreshAvailablePoints();
    this._addressService.getMyAddresses().subscribe(result => {
      this.addresses = result.result;
    });
    this._billingInfoService.getMyBillingInfos().subscribe(result => {
      this.myBillingInfos = result.result;
    });
  }
  onSubmit() {
    this._orderService.createOrder(this.dataForm.value).subscribe(result => {
      console.log(result);
      this._router.navigate(["buyer", "orders"]);
    });
  }
  refreshAvailablePoints() {
    this._buyerService.getAvailableCashback().subscribe(result => {
      this.availablePoints = result.result.availableCashBack;
    });
  }
  public getShoppingCart() {
    this._buyerService.getShoppingCart().subscribe(
      (shoppingCartList: any) => {
        this.shoppingCartProducts = shoppingCartList['result'];
        console.log(this.shoppingCartProducts);
        this.getTotalPrice();
      },
      (err) => {
        console.log("can't get shopping cart");
      }
    );
  }
  public getTotalPrice() {
    this.totalPrice = 0;
    this.shoppingCartProducts.map(product => {
      this.totalPrice += (product.quantity * product.productId.price);
    });
  }
}
