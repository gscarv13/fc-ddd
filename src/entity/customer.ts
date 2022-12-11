import Address from "./address";

export default class Customer {

  private _id: string;
  private _name = "";
  private _active = false;
  private _rewardPoints = 0;
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

  get id() { return this._id; }
  get name() { return this._name; }
  get rewardPoints() { return this._rewardPoints; }

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

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  deactivate() {
    this._active = false;
  }

  isActive() {
    return this._active
  }
}