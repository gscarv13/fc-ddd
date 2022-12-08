export default class Product {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  get name() { return this._name; }
  get price() { return this._price; }

 validate() {
  if (this._id.length === 0) {
    throw new Error("ID is required for Product");
  }
  if (this._name.length === 0) {
    throw new Error("name is required for Product");
  }
  if (this._price < 0 ) {
    throw new Error("price must be greater than zero for Product");
  }
 }

 changeName(name: string) {
  this._name = name;
  this.validate();
 }
 
 changePrice(price: number) {
  this._price = price;
  this.validate();
 }
}
