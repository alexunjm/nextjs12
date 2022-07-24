interface ValidHandler<T> {
  canHandle(...args: T[]): boolean;
}

export interface Handler<T, U> extends ValidHandler<T> {
  chainWith(handler: Handler<T, U>): Handler<T, U>;
  handle(...args: T[]): Promise<U>;
}
