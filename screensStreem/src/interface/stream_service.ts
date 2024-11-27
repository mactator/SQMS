export type CallThisWhenEventTriggered<T> = (event: T) => void

export interface StreamService<T> {
    //subscribe
    subscribe(fn: CallThisWhenEventTriggered<T>): () => void;

    notify(event: T): void
}