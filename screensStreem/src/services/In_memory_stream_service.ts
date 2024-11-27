import type { CallThisWhenEventTriggered, StreamService } from "../interface/stream_service.js";

export class InMemoryStreamService<T> implements StreamService<T> {
  
  private subscribers: Set<CallThisWhenEventTriggered<T>> = new Set();

  // Subscribe to the event stream
  subscribe(fn: CallThisWhenEventTriggered<T>): () => void {
    this.subscribers.add(fn);

    // Return an unsubscribe function
    return () => {
      this.subscribers.delete(fn);
    };
  }

  notify(event: T): void {
    this.trigger(event);
  }

  // Trigger an event for all subscribers
  trigger(event: T): void {
    for (const subscriber of this.subscribers) {
      subscriber(event);
    }
  }
}