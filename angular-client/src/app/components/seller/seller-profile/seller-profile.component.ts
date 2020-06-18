import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuListModel } from 'src/app/models/menu-list';

@Component({
  selector: 'seller-app-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.css'],
})
export class SellerProfileComponent {
  menuListModel: MenuListModel = new MenuListModel('Seller', 'menu',[
      { id: 'products', text: 'My Products' },
      { id: 'orders', text: 'Orders' }
    ], true);

  constructor(private route: ActivatedRoute) {  }
}
