import { Handler } from "@application/shared/service-chain/handler/handler.interface";

interface ValidHandler<T> {
  canHandle(...args: T[]): boolean;
}

export abstract class ChainableHandler<T, U>
  implements Handler<T, U>, ValidHandler<T>
{
  private next: Handler<T, U> | undefined;

  public chainWith(handler: Handler<T, U>): Handler<T, U> {
    this.next = handler;
    return handler;
  }

  private callToNextHandler(...args: T[]): Promise<U> {
    if (this.next) {
      return this.next.handle(...args);
    }

    throw new Error("Handler has no next");
  }

  public handle(...args: T[]): Promise<U> {
    if (this.canHandle(...args)) {
      return this.run(...args);
    }

    return this.callToNextHandler(...args);
  }

  abstract canHandle(...args: T[]): boolean;

  abstract run(...args: T[]): Promise<U>;
}
