import { Model, Table, PrimaryKey, Column } from "sequelize-typescript";

@Table({
  tableName: "customers",
  timestamps: false,
})

export default class CustomerModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({allowNull: false})
  declare name: string;

  @Column({allowNull: false})
  declare street: string;

  @Column({allowNull: false})
  declare number: number;
  
  @Column({allowNull: false})
  declare zipcode: string;

  @Column({allowNull: false})
  declare state: string;

  @Column({allowNull: false})
  declare active: boolean;

  @Column({allowNull: false})
  declare rewardPoints: number

}

/*
  Important to note that the way we model the database table IS NOT the same modeling the domain
  Both are not strictly related.The domain modeling should not be done thinking about the database table structure
  as the database will later be developed taking into account our domain.

  With that said, note that even though the address is a value object on the customer domain, for the design of this project, 
  the address is contained on the customer table
*/
