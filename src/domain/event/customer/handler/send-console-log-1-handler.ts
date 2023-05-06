import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../customerCreated.event";

export default class SendConsoleLogHandler1
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log(
      `Esse é o primeiro console.log do evento: ${event.constructor.name}`
    );
  }
}
