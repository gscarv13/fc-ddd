import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";

describe('Customer repository test', () => {
  let sequelize: Sequelize;
  let customerRepository: CustomerRepository;

  beforeEach(async() => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    });

    sequelize.addModels([CustomerModel])

    customerRepository = new CustomerRepository();

    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close();
  })

  it('should create a customer', async() => {
    const customer = new Customer("id1", "Kurtz");
    const address = new Address("street1", 1, "asd111", "state1");

    customer.address = address;
    await customerRepository.create(customer);

    const customerModelFetchedData = await CustomerModel.findOne({ where: { id: 'id1'}})

    expect(customerModelFetchedData.toJSON()).toStrictEqual({
      id: 'id1',
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zipCode,
      state: 'state1'
    })
  })

  it('should update customer', async () => {
    const customer = new Customer("id1", "Kurtz");
    const address = new Address("street1", 1, "asd111", "state1");

    customer.address = address;
    await customerRepository.create(customer);
    
    customer.changeName('Uber Kurtz')
    customer.deactivate()
    await customerRepository.update(customer)

    const customerModelFetchedData = await CustomerModel.findOne({ where: { id: 'id1'}})

    expect(customerModelFetchedData.toJSON()).toStrictEqual({
      id: 'id1',
      name: 'Uber Kurtz',
      active: false,
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zipCode,
      state: 'state1'
    })
  })

  describe('find', () => {
    it('should find customer', async () => {
        const customer = new Customer("id1", "Kurtz");
      const address = new Address("street1", 1, "asd111", "state1");
  
      customer.address = address;
      await customerRepository.create(customer);
  
      const customerModelFetchedData = await CustomerModel.findOne({ where: { id: 'id1'}})
      
      const foundCustomer = await customerRepository.find(customer.id)
  
      expect(customerModelFetchedData.toJSON()).toStrictEqual({
        id: 'id1',
        name: foundCustomer.name,
        active: foundCustomer.isActive(),
        rewardPoints: foundCustomer.rewardPoints,
        street: foundCustomer.address.street,
        number: foundCustomer.address.number,
        zipcode: foundCustomer.address.zipCode,
        state: foundCustomer.address.state
      })
    })
  
    it('should throw error if customer not found', async() => {
      const customerRepository = new CustomerRepository()

      expect(async() => {
        await customerRepository.find('CustomerThatDoNotExists');
      }).rejects.toThrow('Customer not found')
    })
  })

  describe('findAll', () => {
    it('should find all', async() => {
        const customer1 = new Customer("id1", "Kurtz");
      const address1 = new Address("street1", 1, "asd111", "state1");
      customer1.address = address1;
      
      const customer2 = new Customer("id2", "Kurtz");
      const address2 = new Address("street2", 2, "asd222", "state2");
      customer2.address = address2;

      await customerRepository.create(customer1);
      await customerRepository.create(customer2);
  
      const customers = await customerRepository.findAll()
      expect(customers).toHaveLength(2)
      expect(customers).toContainEqual(customer1)
      expect(customers).toContainEqual(customer2)
    })
  })
})
