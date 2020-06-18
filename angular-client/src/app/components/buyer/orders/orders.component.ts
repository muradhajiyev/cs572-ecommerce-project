import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order, ApiResponse } from 'src/app/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {

  orders: Order[];
  subscription: Subscription;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.subscription = this.orderService.getOrders().subscribe((response: ApiResponse<Order[]>) => {
      this.orders = response.result;
      
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
