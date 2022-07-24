import { NextApiRequest, NextApiResponse } from "next";
import { APIError } from "@application/shared/error";
import { DefaultError } from "@application/shared/error/default.error";
import { Handler } from "@application/shared/service-chain/handler/handler.interface";

export const handleRouteWith = <T>(
  req: NextApiRequest,
  res: NextApiResponse<T | DefaultError>,
  handlers: Handler<NextApiRequest, T>[]
) => {
  try {
    const data = handleRequest(handlers, req);

    res.status(200).json(data);
  } catch (error) {
    const apiError =
      error instanceof APIError ? error : new APIError(500, error as Error);

    res.status(apiError.httpStatusCode).json({
      message: apiError.message,
      detail: apiError.detail,
    });
  }
};

function handleRequest<T, U>(handlers: Handler<T, U>[], req: T) {
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
