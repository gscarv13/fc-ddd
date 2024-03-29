import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Customer("", "John");
    }).toThrowError("ID is required");
  });
  
  it("should throw error when id is empty", () => {
    expect(() => {
      new Customer("123", "");
    }).toThrowError("Name is required");
  });

  it("should change name", () => {

    // This is called AAA (triple A)

    // Arrange
    const customer = new Customer("123", "John");

    // Act
    customer.changeName("Jane");

    // Assert
    expect(customer.name).toBe("Jane");
  });

  it("should throw error if address is undefined when activating customer", () => {
    
    const customer = new Customer("123", "John");
    
    expect(() => {
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  });

  it("should activate customer", () => {
    
    const customer = new Customer("123", "John");
    const address = new Address("street 1", 123, "13330-250", "São Paulo")
    customer.address = address;
    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should deactivate customer", () => {
    
    const customer = new Customer("123", "John");
    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("it should add reward points", () => {
    const customer = new Customer("123", "John")
    expect(customer.rewardPoints).toBe(0)

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(20)
  })
});
