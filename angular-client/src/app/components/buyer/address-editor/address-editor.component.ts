import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-address-editor',
  templateUrl: './address-editor.component.html',
  styleUrls: ['./address-editor.component.css']
})
export class AddressEditorComponent implements OnInit {
  addressId: string;
  dataForm = new FormGroup({
    street: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    zipCode: new FormControl('', Validators.required)
  });
  constructor(private _addressService: AddressService,private _router: Router, private _route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.addressId = this._route.snapshot.params['id'];
    if (this.addressId) {
      this._addressService.getMyAddress(this.addressId).subscribe(addressResult => {
        let address = addressResult.result;
        this.dataForm = this.fb.group({
          street: [address.street, Validators.required],
          city: [address.city, Validators.required],
          state: [address.state, Validators.required],
          phoneNumber: [address.phoneNumber, Validators.required],
          zipCode: [address.zipCode, Validators.required],
          country: [address.country, Validators.required]
        });
      });
    }
  }
  onSubmit() {
    console.log(this.dataForm.value);
    if (this.addressId) {
      this._addressService.editAddress(this.addressId, this.dataForm.value).subscribe(result => {
        this._router.navigate(["buyer", "addresses"]);
      });
    } else {
      this._addressService.addAddress(this.dataForm.value).subscribe(result => {
        this._router.navigate(["buyer", "addresses"]);
      });
    }
  }


}
