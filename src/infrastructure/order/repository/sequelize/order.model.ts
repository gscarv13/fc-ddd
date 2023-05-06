import { Model, Table, PrimaryKey, Column, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderItemModel from "./order-item.model";

@Table({
  tableName: "orders",
  timestamps: false,
})

export default class OrderModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  // This will create the relationship
  @ForeignKey(() => CustomerModel)
  @Column({ allowNull: false })
  declare customer_id: string;

  // And this will fetch the customer along with the order WHEN done through the query
  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  @HasMany(() => OrderItemModel, 'order_id')
  declare items: OrderItemModel[];

  @Column({ allowNull: false })
  declare total: number;
}


