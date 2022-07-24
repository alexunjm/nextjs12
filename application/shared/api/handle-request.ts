import { NextApiRequest, NextApiResponse } from "next";
import { HttpHandler } from "@application/shared/api/http.handler";
import { APIError } from "@application/shared/error";
import { DefaultError } from "@application/shared/error/default.error";
import { Handler } from "@application/shared/service-chain/handler/handler.interface";

export const handleRouteWith = async <HandleReturnType>(
  req: NextApiRequest,
  res: NextApiResponse<HandleReturnType | DefaultError>,
  handlers: HttpHandler<HandleReturnType>[]
) => {
  try {
    const data = await handleRequest(handlers, req, res);

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

function handleRequest<HandleArgs, HandleReturnType>(
  handlers: Handler<HandleArgs, HandleReturnType>[],
  ...args: HandleArgs[]
): Promise<HandleReturnType> {
  const firstHandler = buildChain(handlers);
  return firstHandler.handle(...args);
}

function buildChain<T, U>(handlers: Handler<T, U>[]): Handler<T, U> {
  let handler = handlers[0];
  for (let index = 0; index < handlers.length; index++) {
    handler = handler.chainWith(handlers[index]);
  }
  return handlers[0];
}
