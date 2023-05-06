import EventDispatcher from "../../@shared/event/event-dispatcher"
import CustomerCreatedEvent from "./customerCreated.event"
import SendConsoleLogHandler1 from "./handler/send-console-log-1-handler"
import SendConsoleLogHandler2 from "./handler/send-console-log-2.handler"

describe('Customer Events tests', () => {
  it('notify when Customer is created', () => {
    const eventDispatcher = new EventDispatcher()
    const handlerLog1 = new SendConsoleLogHandler1()
    const handlerLog2 = new SendConsoleLogHandler2()
    
    const spyLog1 = jest.spyOn(handlerLog1, "handle")
    const spyLog2 = jest.spyOn(handlerLog2, "handle")

    eventDispatcher.register("CustomerCreatedEvent", handlerLog1)
    eventDispatcher.register("CustomerCreatedEvent", handlerLog2)

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2)
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(handlerLog1)
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(handlerLog2)


    const customerCreated = new CustomerCreatedEvent({
      id: 'a5c84c6241',
      name: 'Customer1'
    })

    eventDispatcher.notify(customerCreated)

    expect(spyLog1).toHaveBeenCalled()
    expect(spyLog2).toHaveBeenCalled()
  })
})