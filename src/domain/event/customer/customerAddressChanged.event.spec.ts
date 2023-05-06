import Address from "../../entity/address";
import Customer from "../../entity/customer";
import EventDispatcher from "../@shared/event-dispatcher";
import CustomerAddressChangedHandler from "./handler/customer-address-changed-handler";

describe('Domain Events tests', () => {
  it('notify when customer address is changed', () => {
    const eventDispatcher = new EventDispatcher()
    const customerAddressChangedHandler = new CustomerAddressChangedHandler()
    const handlerSpy = jest.spyOn(customerAddressChangedHandler, 'handle')

    eventDispatcher.register("CustomerAddressChangedEvent", customerAddressChangedHandler)

    expect(eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'][0]).toMatchObject(customerAddressChangedHandler)

    const customer = new Customer("123", "John")
    const address = new Address("street 1", 123, "13330-250", "São Paulo")

    customer.changeAddress(address, eventDispatcher)

    expect(handlerSpy).toHaveBeenCalled()
  })
})