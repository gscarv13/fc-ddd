import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../customerCreated.event";

export default class SendConsoleLogHandler2
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log(
      `Esse é o segundo console.log do evento: ${event.constructor.name}`
    );
  }
}
