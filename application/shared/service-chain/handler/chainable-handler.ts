import { Handler } from "@application/shared/service-chain/handler/handler.interface";
import { NotHandlerFoundError } from "../error/not-handled.error";

export abstract class ChainableHandler<T, U> implements Handler<T, U> {
  private next: Handler<T, U> | undefined;

  constructor(
    private readonly runnable: {
      run: (...args: T[]) => Promise<U>;
    },
    private readonly handlerHasNoNextMessage = "Handler was not found."
  ) {}

  private callToNextHandler(...args: T[]): Promise<U> {
    if (this.next) {
      return this.next.handle(...args);
    }

    throw new NotHandlerFoundError(this.handlerHasNoNextMessage);
  }

  public chainWith(handler: Handler<T, U>): Handler<T, U> {
    this.next = handler;
    return handler;
  }

  public handle(...args: T[]): Promise<U> {
    if (this.canHandle(...args)) {
      return this.runnable.run(...args);
    }

    return this.callToNextHandler(...args);
  }

  abstract canHandle(...args: T[]): boolean;
}
