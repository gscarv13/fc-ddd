import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    
    expect(() => {
      new Product("", "productName", 100)
    }).toThrowError("ID is required for Product");
  });

  it("should throw error when name is empty", () => {
    
    expect(() => {
      new Product("132", "", 100)
    }).toThrowError("name is required for Product");
  });

  it("should throw error when price less than zero", () => {
    
    expect(() => {
      new Product("132", "productName", -100)
    }).toThrowError("price must be greater than zero for Product");
  });

  it("should change product name", () => {
    const product = new Product("123", "product1", 100)
    product.changeName("product22")
    expect(product.name).toBe("product22")
  })

  it("should change price", () => {
    const product = new Product("123", "product1", 100)
    product.changePrice(2658)
    expect(product.price).toBe(2658)
  })

});
