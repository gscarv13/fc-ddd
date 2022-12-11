import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Order("", "123", []);
    }).toThrowError("ID is required for Order");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      new Order("321", "", []);
    }).toThrowError("customerID is required for Order");
  });

  it("should throw error when OrderItem is less than 1", () => {
    expect(() => {
      new Order("321", "123", []);
    }).toThrowError("The order needs to have at least one item");
  });

  it("should calculate total", () => {
    const items = Array.from(
      { length: 3 },
      (_, id) => new OrderItem(`id-${id}`, `item-${id}`, Number(id) * 10,`product-${id}`, 2)
    );

    const order = new Order("order-123", "client-123", items);

    expect(order.total()).toBe(60);
  });
});
