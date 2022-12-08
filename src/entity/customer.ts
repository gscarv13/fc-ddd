import Address from "./address";

export default class Customer {

  private _id: string;
  private _name = "";
  private _active = false;
  address?: Address = undefined;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("ID is required");
      
    }

    if (this._name.length === 0) {
      throw new Error("Name is required");
      
    }
  }

  get name(): string { return this._name; }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if(this.address === undefined) {
      throw new Error("Address is mandatory to activate a customer")
    }

    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  isActive() {
    return this._active
  }
}