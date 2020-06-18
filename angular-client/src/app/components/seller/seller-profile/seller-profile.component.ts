import { Component, OnInit } from '@angular/core';
import { MenuListModel } from 'src/app/models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'seller-app-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.css'],
})
export class SellerProfileComponent {
  menuListModel: MenuListModel = new MenuListModel(
    'Seller',
    'menu',
    [
      { id: 'myproducts', text: 'My Products' },
      { id: 'orders', text: 'Orders' },
      { id: 'create-product', text: 'Create Product' },
    ],
    true
  );

  constructor(private route: ActivatedRoute) {
    // route.queryParams.subscribe(queryParams => {
    //   this.currentTab = queryParams['tab'];
    // });
  }

<<<<<<< HEAD
  ngOnInit(): void {}
=======
>>>>>>> 83c04e7f5bf33da50465fff228e863ed15deb092
}
