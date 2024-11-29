export class RedisStreamService {
    subscribers = new Set();
    // Subscribe to the event stream
    subscribe(fn) {
        this.subscribers.add(fn);
        // Return an unsubscribe function
        return () => {
            this.subscribers.delete(fn);
        };
    }
    notify(event) {
        this.trigger(event);
    }
    // Trigger an event for all subscribers
    trigger(event) {
        for (const subscriber of this.subscribers) {
            subscriber(event);
        }
    }
}
