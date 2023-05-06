import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../customerAddressChanged.event";

export default class CustomerAddressChangedHandler implements EventHandlerInterface<CustomerAddressChangedEvent> {
  handle(event: CustomerAddressChangedEvent): void {
    const {id, name, address } = event.eventData
    const { street, number, state, zipCode } = address
    const formattedAddress = `${street} ${number} ${state} ${zipCode} `

    console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${formattedAddress}".`)
  }
}