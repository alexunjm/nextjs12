export interface Handler<T, U> {
  chainWith(handler: Handler<T, U>): Handler<T, U>;
  handle(params: T): U;
}

export interface ValidHandler<T> {
  canHandle(params: T): boolean;
}

export class BaseHandler<T, U> implements Handler<T, U> {
  private next: Handler<T, U> | undefined;

  public chainWith(handler: Handler<T, U>): Handler<T, U> {
    this.next = handler;
    return handler;
  }

  public handle(params: T): U {
    if (this.next) {
      return this.next.handle(params);
    }

    throw new Error("Handler has no next");
  }
}

export abstract class ConcreteHandler<T, U>
  extends BaseHandler<T, U>
  implements ValidHandler<T>
{
  abstract canHandle(params: T): boolean;

  public handle(params: T): U {
    if (this.canHandle(params)) {
      return this.handleImpl(params);
    }
    return super.handle(params);
  }

  abstract handleImpl(params: T): U;
}
