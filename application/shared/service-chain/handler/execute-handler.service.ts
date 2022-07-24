import { Handler } from "./handler.interface";

interface ValidHandler<T> {
  canHandle(params: T): boolean;
}

class BaseHandler<T, U> implements Handler<T, U> {
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

export abstract class ExecuteHandlerService<T, U>
  extends BaseHandler<T, U>
  implements ValidHandler<T>
{
  abstract canHandle(params: T): boolean;

  public handle(params: T): U {
    if (this.canHandle(params)) {
      return this.execute(params);
    }
    return super.handle(params);
  }

  abstract execute(params: T): U;
}
