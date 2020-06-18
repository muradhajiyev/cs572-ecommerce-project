import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {User} from "../../models";

@Component({
  selector: 'app-pending-sellers',
  templateUrl: './pending-sellers.component.html',
  styleUrls: ['./pending-sellers.component.css']
})
export class PendingSellersComponent implements OnInit {
  public headerTitles = ['Seller name', 'Seller email', 'Actions'];
  public pendingSellers: User[];

  constructor(private _adminService: AdminService) {
  }

  ngOnInit(): void {
    this.getpendingSellers();
  }

  public getpendingSellers() {
    this._adminService.getPendingSellers().subscribe(
      (sellers: User[]) => {
        this.pendingSellers = sellers['result'];
      },
      (err) => {
        console.log("can't get pending sellers");
      }
    );
  }

  public approveSeller(sellerId) {
      const sellerIdString = sellerId.toString();
      this._adminService.approveSeller(sellerIdString).subscribe(
        () => {
          this.pendingSellers = this.pendingSellers.filter( seller => {
            return seller['_id'] != sellerIdString;
          });
          console.log('seller Approved');
        },
        (err) => {
          console.log('error in approving seller: ', err);
        }
      );
  }

  public rejectSeller(sellerId) {
    const sellerIdString = sellerId.toString();
    this._adminService.rejectSeller(sellerIdString).subscribe(
      () => {
        this.pendingSellers = this.pendingSellers.filter( seller => {
          return seller['_id'] != sellerIdString;
        });
        console.log('seller rejected');
      },
      (err) => {
        console.log('error in rejecting seller: ', err);
      }
    );
  }

}
