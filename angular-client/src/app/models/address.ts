export class Address {
    _id: string;
    zipCode: string;
    street: string;
    city: string;
    state: string;
    phoneNumber: string;
    country: string;
    
    constructor(){}

    public toString = () : string => {
        console.log("toString()");
        return this.city + ", " + this.state + ", " + this.street + ", " + this.zipCode + ", " + this.phoneNumber + ", " + this.country;
    }
}