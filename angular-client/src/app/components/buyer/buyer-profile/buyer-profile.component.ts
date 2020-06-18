import { Component, OnInit } from '@angular/core';
import { MenuListModel } from 'src/app/models/menu-list';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buyer-profile',
  templateUrl: './buyer-profile.component.html',
  styleUrls: ['./buyer-profile.component.css'],
})
export class BuyerProfileComponent implements OnInit {
  // currentTab: string = "addresses";

  menuListModel: MenuListModel = new MenuListModel(
    'Buyer',
    'tab',
    [
      { id: 'addresses', text: 'Addresses' },
      { id: 'billing-infos', text: 'Billing info' },
      { id: 'orders', text: 'Orders' },
      { id: 'shopping-cart', text: 'Shopping cart' },
    ],
    true
  );
  constructor(private route: ActivatedRoute) {
    // route.queryParams.subscribe(queryParams => {
    //   this.currentTab = queryParams['tab'];
    // });
  }

  ngOnInit(): void {}
}
