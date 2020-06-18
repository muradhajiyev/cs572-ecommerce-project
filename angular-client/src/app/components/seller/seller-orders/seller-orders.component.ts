import { OnInit, Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order, ApiResponse } from 'src/app/models';

@Component({
  selector: 'seller-app-orders',
  templateUrl: './seller-orders.component.html',
  styleUrls: ['./seller-orders.component.css'],
})
export class SellerOrdersComponent implements OnInit {

  orders: Order[];

  constructor(private orderService: OrderService){}

  ngOnInit(): void {
    this.getOrders();
  }


  public cancelOrder(order){
    this.orderService.cancelOrder(order._id).subscribe((res: ApiResponse<Order>) => {
      alert("Order Status was changed successfully");
      this.getOrders();
    },
    err => alert(err.error.result.message))
  }

  public processOrder(order: Order){
    this.orderService.processOrder(order._id).subscribe((res: ApiResponse<Order>) =>{
      alert("Order was processed successfully.");
      this.getOrders();
    },
    err => alert(err.error.result.message))
  }

  private getOrders(){
    this.orderService.getOrders().subscribe((res: ApiResponse<Order[]>) => {
      this.orders = res.result;
      console.log(this.orders);
      
    })
  }
}
