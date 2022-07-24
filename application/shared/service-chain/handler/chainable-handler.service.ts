import { Handler } from "./handler.interface";

interface ValidHandler<T> {
  canHandle(params: T): boolean;
}

export abstract class ChainableHandler<T, U>
  implements Handler<T, U>, ValidHandler<T>
{
  private next: Handler<T, U> | undefined;

  public chainWith(handler: Handler<T, U>): Handler<T, U> {
    this.next = handler;
    return handler;
  }

  private callToNextHandler(params: T): U {
    if (this.next) {
      return this.next.handle(params);
    }

    throw new Error("Handler has no next");
  }

  public handle(params: T): U {
    if (this.canHandle(params)) {
      return this.run(params);
    }

    return this.callToNextHandler(params);
  }

  abstract canHandle(params: T): boolean;

  abstract run(params: T): U;
}
