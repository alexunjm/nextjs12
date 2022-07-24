interface ValidHandler<T> {
  canHandle(...args: T[]): boolean;
}

export interface Handler<HandleArgs, ReturnType>
  extends ValidHandler<HandleArgs> {
  chainWith(
    handler: Handler<HandleArgs, ReturnType>
  ): Handler<HandleArgs, ReturnType>;
  handle(...args: HandleArgs[]): Promise<ReturnType>;
}
