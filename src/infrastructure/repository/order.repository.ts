import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import Order from "../../domain/entity/order";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderItem from "../../domain/entity/order_item";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity
        })),
      },
      {
        include: [{ model: OrderItemModel }]
      }
    )
  }

  async update(entity: Order): Promise<void> {
    const orderData = { total: entity.total() }
    const t = await OrderModel.sequelize.transaction();

    try {
      await OrderModel.update(orderData, {
        where: {
          id: entity.id,
        },
        transaction: t,
      });

      const existingOrderItems = await OrderItemModel.findAll({
        where: {
          order_id: entity.id,
        },
        transaction: t,
      });

      const existingOrderItemIds = existingOrderItems.map((item) => item.id);
      const newOrderItemIds = entity.items.map((item) => item.id);
      const deletedOrderItemIds = existingOrderItemIds.filter((id) => !newOrderItemIds.includes(id));

      await OrderItemModel.destroy({
        where: {
          id: deletedOrderItemIds,
        },
        transaction: t,
      });
  
      await Promise.all(
        entity.items.map(async (item) => { 
          if (existingOrderItemIds.includes(item.id)) {
            await OrderItemModel.update(item, {
              where: {
                id: item.id,
              },
              transaction: t,
            });
          } else {
            await OrderItemModel.create({
              id: item.id,
              name: item.name,
              price: item.price,
              product_id: item.productId,
              quantity: item.quantity,
              order_id: entity.id,
            }, {
              transaction: t,
            });
          }
        })
      );
  
      await t.commit();

    } catch (err) {
      await t.rollback();
      throw err;
    }
  }

  async find(id: string): Promise<Order> {
    const order = await OrderModel.findOne({ where: {id: id}, include: ['items'] })
    const items = order.items.map((item) => (
      new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
    ))

    return new Order(order.id, order.customer_id, items)
  }

  async findAll(): Promise<Order[]> {
    const entries = await OrderModel.findAll({ include: ['items'] })

    return entries.map(entry => {
      const items = entry.items.map((item) => (
        new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
      ))
        return new Order(entry.id, entry.customer_id, items)
    }
    )
  }
}
