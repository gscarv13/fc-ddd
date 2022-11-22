export default class Address {
  _street: string;
  _state: string;
  _number: number;
  _zipCode: string;

  constructor(street: string, number: number, zipCode: string, state: string) {
    this._street = street;
    this._number = number;
    this._state = state;
    this._zipCode = zipCode;

    console.log(this._number);


    this.validate();
  }

  validate() {
    if (this._street.length === 0) {
      throw new Error("street is required for Address");
    }
    if (this._state.length === 0) {
      throw new Error("state is required for Address");
    }
    if (this._number < 0 ) {
      throw new Error("number is required and should be greater than zero for Address");
    }
    if (this._zipCode.length === 0 ) {
      throw new Error("zipCode is required for Address");
    }
  
   }
}
