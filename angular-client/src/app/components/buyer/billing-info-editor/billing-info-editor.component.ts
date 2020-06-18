import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BillingInfoService } from 'src/app/services/billing-info.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-billing-info-editor',
  templateUrl: './billing-info-editor.component.html',
  styleUrls: ['./billing-info-editor.component.css']
})
export class BillingInfoEditorComponent implements OnInit {
  billingInfoId: string;
  addresses: Address[] = [];
  dataForm = new FormGroup({
    cardNumber: new FormControl('', Validators.required),
    cardName: new FormControl('', Validators.required),
    expirationDate: new FormControl('', Validators.required),
    securityCode: new FormControl('', Validators.required),
    billingAddressId: new FormControl('', Validators.required),
    billingAddress: new FormGroup({
      zipCode: new FormControl(''),
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      phoneNumber: new FormControl(''),
      country: new FormControl('')
    })
  });
 
  constructor(private _addressService: AddressService, private _billingInfoService: BillingInfoService, private _router: Router,
    private _route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this._addressService.getMyAddresses().subscribe(result => {
      this.addresses = result.result;
    });

    this.billingInfoId = this._route.snapshot.params['id'];
    if (this.billingInfoId) {
      this._billingInfoService.getMyBillingInfo(this.billingInfoId).subscribe(result => {
        let billingInfo = result.result;
        if (!billingInfo.billingAddress) {
          billingInfo.billingAddress = { zipCode: '', city: '', country: '', phoneNumber: '', state: '', street: '' };
        }
        this.dataForm = new FormGroup({
          cardNumber: new FormControl(billingInfo.cardNumber, Validators.required),
          cardName: new FormControl(billingInfo.cardName, Validators.required),
          expirationDate: new FormControl(billingInfo.expirationDate, Validators.required),
          securityCode: new FormControl(billingInfo.securityCode, Validators.required),
          billingAddress: new FormGroup({
            zipCode: new FormControl(billingInfo.billingAddress.zipCode, Validators.required),
            street: new FormControl(billingInfo.billingAddress.street, Validators.required),
            city: new FormControl(billingInfo.billingAddress.city, Validators.required),
            state: new FormControl(billingInfo.billingAddress.state, Validators.required),
            phoneNumber: new FormControl(billingInfo.billingAddress.phoneNumber, Validators.required),
            country: new FormControl(billingInfo.billingAddress.country, Validators.required)
          })
        });
      });
    }
  }
  onSubmit() {
    if (this.billingInfoId) {
      this._billingInfoService.editBillingInfo(this.billingInfoId, this.dataForm.value).subscribe(result => {
        this._router.navigate(["buyer", "billing-infos"]);
      });
    } else {
      this._billingInfoService.addBillingInfo(this.dataForm.value).subscribe(result => {
        this._router.navigate(["buyer", "billing-infos"]);
      });
    }
  }
}
