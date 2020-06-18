import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {
  addresses: Address[] = [];
  constructor(private _addressService: AddressService) { }

  ngOnInit(): void {
    this.refreshAddresses();
  }
  refreshAddresses(){
    this._addressService.getMyAddresses().subscribe(addresses => {
      this.addresses = addresses.result;
    });
  }

  removeAddress(id: string) {
    if(confirm("Are you sure to delete this address?")) {
      this._addressService.deleteAddress(id).subscribe(result => {
        this.refreshAddresses();
      });
    }
  }

}
