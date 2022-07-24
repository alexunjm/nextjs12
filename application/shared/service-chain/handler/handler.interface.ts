export interface Handler<T, U> {
  chainWith(handler: Handler<T, U>): Handler<T, U>;
  handle(params: T): U;
}