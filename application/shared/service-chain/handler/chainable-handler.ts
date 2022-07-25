import { Handler } from "@application/shared/service-chain/handler/handler.interface";
import { NotHandlerFoundError } from "@application/shared/service-chain/error/not-handled.error";

export abstract class ChainableHandler<Arg, HandlerReturnType>
  implements Handler<Arg, HandlerReturnType>
{
  private next: Handler<Arg, HandlerReturnType> | undefined;

  constructor(
    private readonly runnable: {
      run: (...args: Arg[]) => Promise<HandlerReturnType>;
    },
    private readonly handlerHasNoNextMessage = "Handler was not found."
  ) {}

  private callToNextHandler(...args: Arg[]): Promise<HandlerReturnType> {
    if (this.next) {
      return this.next.handle(...args);
    }

    throw new NotHandlerFoundError(this.handlerHasNoNextMessage);
  }

  public chainWith(
    handler: Handler<Arg, HandlerReturnType>
  ): Handler<Arg, HandlerReturnType> {
    this.next = handler;
    return handler;
  }

  public handle(...args: Arg[]): Promise<HandlerReturnType> {
    if (this.canHandle(...args)) {
      return this.runnable.run(...args);
    }

    return this.callToNextHandler(...args);
  }

  abstract canHandle(...args: Arg[]): boolean;
}
