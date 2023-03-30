import { Sequelize } from "sequelize-typescript";

import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import Product from "../../domain/entity/product";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";

import CustomerModel from "../db/sequelize/model/customer.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";

import CustomerRepository from "./customer.repository";
import ProductRepository from "./product.repository";
import OrderRepository from "./order.repository";

describe('Order repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async() => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: true,
      sync: { force: true }
    });

    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close();
  })

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("customerid1", "Kurtz");
    const address = new Address("street1", 1, "asd111", "state1");

    customer.address = address;
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product("1", "Product1", 100)
    await productRepository.create(product)

    const orderItem = new OrderItem('1', product.name, product.price, product.id, 2)

    const order = new Order('orderid1', 'customerid1', [orderItem])
    const orderRepository = new OrderRepository();
    

    await orderRepository.create(order)

    const orderModelFetchedData = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });
  
    expect(orderModelFetchedData.toJSON()).toStrictEqual({
      id: "orderid1",
      customer_id: "customerid1",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
          product_id: product.id
        },
      ],
    })
  })

  it('should update an order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("customerid1", "Kurtz");
    const address = new Address("street1", 1, "asd111", "state1");

    customer.address = address;
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product("1", "Product1", 100)
    await productRepository.create(product)
    
    const orderItem = new OrderItem('1', product.name, product.price, product.id, 2)

    const order = new Order('orderid1', 'customerid1', [orderItem])
    const orderRepository = new OrderRepository();

    await orderRepository.create(order)

    const product2 = new Product("2", "Product2", 200)
    await productRepository.create(product2)

    const orderItem2 = new OrderItem('2', product2.name, product2.price, product2.id, 4)
    
    order.addItem(orderItem2)

    await orderRepository.update(order)

    const orderModelFetchedData = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });
    
    expect(orderModelFetchedData.toJSON()).toStrictEqual({
      id: "orderid1",
      customer_id: "customerid1",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
          product_id: product.id
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          order_id: order.id,
          product_id: product2.id
        },
      ],
    })

  })

  it('should find an order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("customerid1", "Kurtz");
    const address = new Address("street1", 1, "asd111", "state1");

    customer.address = address;
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product("1", "Product1", 100)
    await productRepository.create(product)
    
    const orderItem = new OrderItem('1', product.name, product.price, product.id, 2)

    const order = new Order('orderid1', 'customerid1', [orderItem])
    const orderRepository = new OrderRepository();

    await orderRepository.create(order)

    const orderModelFetchedData = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    const foundOrder = await orderRepository.find(order.id)

    expect(orderModelFetchedData.toJSON()).toStrictEqual({
      id: "orderid1",
      customer_id: "customerid1",
      total: foundOrder.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: foundOrder.id,
          product_id: product.id
        },
      ],
    }) 
  })

  it('should find all orders', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("customerid1", "Kurtz");
    const address = new Address("street1", 1, "asd111", "state1");

    customer.address = address;
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product("1", "Product1", 100)
    await productRepository.create(product)
    
    const orderItem1 = new OrderItem('1', product.name, product.price, product.id, 2)
    const orderItem2 = new OrderItem('2', product.name, product.price, product.id, 2)
    const orderItem3 = new OrderItem('3', product.name, product.price, product.id, 2)

    const order1 = new Order('orderid1', 'customerid1', [orderItem1])
    const orderRepository = new OrderRepository();

    await orderRepository.create(order1)

    const order2 = new Order('orderid2', 'customerid1', [orderItem2])
    
    await orderRepository.create(order2)

    const order3 = new Order('orderid3', 'customerid1', [orderItem3])
    
    await orderRepository.create(order3)

    const allFound = await orderRepository.findAll()

    expect([order1, order2, order3]).toEqual(allFound)
  })
})
