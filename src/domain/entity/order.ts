import OrderItem from "./order_item";

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items
    this._total = this.total();
    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("ID is required for Order");
    }
    if (this._customerId.length === 0) {
      throw new Error("customerID is required for Order");
    }
    if (this._items.length <= 0) {
      throw new Error("The order needs to have at least one item");
    }
  

    return true;
  }

  get id() { return this._id; }
  get customerId() { return this._customerId; }
  get items(): OrderItem[] { return this._items }

  total(): number {
    return this._items.reduce((total, item) => total + item.orderItemTotal(), 0);
  }
}