import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer-repository.interface";
import CustomerModel from "./customer.model";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zipCode,
      state: entity.address.state,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints
    })
  }

  async update(entity: Customer): Promise<void> {
    CustomerModel.update(
      {
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        zipcode: entity.address.zipCode,
        state: entity.address.state,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints
      },
      {
        where: {
          id: entity.id
        }
      }
    )
  }

  
  async find(id: string): Promise<Customer> {
    let customerRecord = null;

    try {
      customerRecord = await CustomerModel.findOne(
        { 
          where : { 
            id: id 
          },
          rejectOnEmpty: true
        }
        )
    } catch (error) {
      throw new Error("Customer not found");
    }

    const customer = new Customer(customerRecord.id, customerRecord.name)
    const address = new Address(
      customerRecord.street,
      customerRecord.number,
      customerRecord.zipcode,
      customerRecord.state
    )

    customer.address = address

    return customer
  }

  async findAll(): Promise<Customer[]> {
    const customerRecords = await CustomerModel.findAll()
    const customers = customerRecords.map(customerRecord => {
      const customer = new Customer(customerRecord.id, customerRecord.name)
      customer.addRewardPoints(customerRecord.rewardPoints)

      const address = new Address(
        customerRecord.street,
        customerRecord.number,
        customerRecord.zipcode,
        customerRecord.state
      )

      customer.address = address
      if (customerRecord.active) {
        customer.activate()
      }

      return customer
    })

    return customers
  }
}