import Customer from "../../customer/entity/customer"
import Order from "../entity/order"
import OrderItem from "../entity/order_item"
import OrderService from "./order.service"

describe('OrderService unit tests', () => {

  it('it should place an order', () => {
    const customer = new Customer('c1', "customer 1")
    const item1 = new OrderItem("i1", "Item 1", 10,"p1", 1)

    const order = OrderService.placeOrder(customer, [item1])

    expect(customer.rewardPoints).toBe(5)
    expect(order.total()).toBe(10)
  })
  
  it('it should sum up the total of all orders', () => {
    const orderItem1 = new OrderItem('i1', "item 1", 100,'p1', 1)
    const orderItem2 = new OrderItem('i2', "item 2", 200,'p2', 5)
    const orderItem3 = new OrderItem('i3', "item 3", 300,'p3', 1)

    const order1 = new Order("id1", "c1", [orderItem1])
    const order2 = new Order("id2", "c2", [orderItem2, orderItem3])


    const total = OrderService.total([order1, order2])

    expect(total).toBe(1400)
  })
})