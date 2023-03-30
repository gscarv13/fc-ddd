import { Sequelize } from "sequelize-typescript";
import Product from "../../domain/entity/product";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "./product.repository";

describe("Product repository test", () => {
  let sequelize: Sequelize;
  let productRepository: ProductRepository;

  beforeEach(async() => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    });

    productRepository = new ProductRepository();

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close();
  })

  it("should create a product", async() => {
    const product = new Product("productid1", "Product1", 100)

    await productRepository.create(product)

    const productModel = await ProductModel.findOne({ where: { id: product.id }})

    expect(productModel.toJSON()).toStrictEqual({
      id: product.id,
      name: "Product1",
      price: 100
    })
  })

  it('should update a product', async () => {
    const product = new Product('productid1', 'product-5600', 900)

    await productRepository.create(product)

    product.changeName('product-9000')
    product.changePrice(9000)

    await productRepository.update(product)

    const retrievedProduct = await ProductModel.findOne({where: { id: product.id }})

    expect(retrievedProduct.toJSON()).toStrictEqual({ 
      id: product.id,
      name: 'product-9000',
      price: 9000
     })
  })

  it( 'should find a product', async () => {
    const product = new Product('productid1', 'find-me', 599)

    await productRepository.create(product)

    const productModel = await ProductModel.findOne({where: { id: product.id } })
    
    const foundProduct = await productRepository.find(product.id)

    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price
    })
  })

  it('should find all products', async () => {
    const product1 = new Product('productid1', 'product1', 100)
    const product2 = new Product('productid2', 'product2', 200)
    const product3 = new Product('productid3', 'product3', 300)

    await productRepository.create(product1)
    await productRepository.create(product2)
    await productRepository.create(product3)

    const foundAll = await productRepository.findAll()

    expect([product1, product2, product3]).toEqual(foundAll)
  })
})