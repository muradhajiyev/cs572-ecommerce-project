export class BillingInfo{
    _id: string;
    cardNumber: string;
    cardName: string;
    expirationDate: Date;
    securityCode: string;
    billingAddressId:string;
    billingAddress: {
        zipCode: string;
        street: string;
        city: string;
        state: string;
        phoneNumber: string;
        country: string;
      };
}