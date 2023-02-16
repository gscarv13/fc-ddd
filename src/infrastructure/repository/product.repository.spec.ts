import { Sequelize } from "sequelize-typescript";
import Product from "../../domain/entity/product";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "./product.repository";

describe("Product repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async() => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    });

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close();
  })

  it("should create a product", async() => {
    const productRepository = new ProductRepository()
    const product = new Product("1", "Product1", 100)

    await productRepository.create(product)

    const productModel = await ProductModel.findOne({ where: { id: "1" }})

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product1",
      price: 100
    })
  })

  it('should update a product', async () => {
    const productRepository = new ProductRepository()
    const product = new Product('id1', 'product-5600', 900)

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
    const productRepository = new ProductRepository()
    const product = new Product('asd', 'find-me', 599)

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
    const productRepository = new ProductRepository()
    const product1 = new Product('1', 'product1', 100)
    const product2 = new Product('2', 'product2', 200)
    const product3 = new Product('3', 'product3', 300)

    await productRepository.create(product1)
    await productRepository.create(product2)
    await productRepository.create(product3)

    const foundAll = await productRepository.findAll()

    expect([product1, product2, product3]).toEqual(foundAll)
  })
})