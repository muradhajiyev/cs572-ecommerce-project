import { Component, OnInit } from '@angular/core';
import { BillingInfo } from 'src/app/models';
import { BillingInfoService } from 'src/app/services/billing-info.service';

@Component({
  selector: 'app-billing-info',
  templateUrl: './billing-info.component.html',
  styleUrls: ['./billing-info.component.css']
})
export class BillingInfoComponent implements OnInit {
  billingInfos: BillingInfo[] = [];
  constructor(private _billingInfoService: BillingInfoService) { }

  ngOnInit(): void {
    this.refreshBillingInfos();
  }
  refreshBillingInfos(){
    this._billingInfoService.getMyBillingInfos().subscribe(bill => {
      this.billingInfos = bill.result;
    });
  }

  removeBillingInfo(id){
    if(confirm("Are you sure to delete this billing info?")) {
      this._billingInfoService.deleteBillingInfo(id).subscribe(result => {
        this.refreshBillingInfos();
      });
    }
  }
}
