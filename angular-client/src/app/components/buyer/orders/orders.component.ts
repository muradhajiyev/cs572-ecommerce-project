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

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.orderService.getOrders().subscribe((response: ApiResponse<Order[]>) => {
      this.orders = response.result;
      
    })
  }


  cancelOrder(order){
    this.orderService.cancelOrder(order.id).subscribe(res =>{
      alert('Canceled');
      this.getOrders();
    }, err => alert('Something went wrong'));
  }

}
