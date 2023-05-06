import EventInterface from "./event.interface";

// When a class created based on this interface, it'll be necessary to specify the EventInterface it supports
// By default this value set to EventInterface if no type is passed in
export default interface EventHandlerInterface<T extends EventInterface=EventInterface> {
  handle(event: T): void;  
}