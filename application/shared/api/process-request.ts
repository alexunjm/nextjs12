import { Handler } from "../service-chain/handler/handler.interface";

export function processRequest<T, U>(req: T, handlers: Handler<T, U>[]) {
  const firstHandler = buildChain(handlers);
  return firstHandler.handle(req) as U;
}

function buildChain<T, U>(handlers: Handler<T, U>[]) {
  let handler = handlers[0];
  for (let index = 0; index < handlers.length; index++) {
    handler = handler.chainWith(handlers[index]);
  }
  return handlers[0];
}
