import { NextApiRequest, NextApiResponse } from "next";
import { HttpHandler } from "@application/shared/api/http.handler";
import { DefaultError } from "@application/shared/error/types";
import { Handler } from "@application/shared/service-chain/handler/handler.interface";
import { corsMiddleware } from "@http-handler/middleware/cors.middleware";
import { ApiError } from "next/dist/server/api-utils";
import { NotHandlerFoundError } from "../service-chain/error/not-handled.error";

const DEFAULT_ERROR_MESSAGE = "An error occurred while handling the request.";

export const handleRouteWith = async <HandleReturnType>(
  req: NextApiRequest,
  res: NextApiResponse<HandleReturnType | DefaultError>,
  handlers: HttpHandler<HandleReturnType>[]
) => {
  try {
    await corsMiddleware(handlers.map((httpHandler) => httpHandler.verb))(
      req,
      res
    );

    res.status(200).json(await handleRequest(handlers, req, res));
  } catch (error) {
    let errorData: DefaultError = {
        message: DEFAULT_ERROR_MESSAGE,
      },
      statusCode: number = 500;

    if (error instanceof ApiError) {
      ({ errorData, statusCode } = responseApiError(error));
    } else if (error instanceof Error) {
      errorData = responseError(error);
    } else if (typeof error === "string") {
      errorData.message = error || DEFAULT_ERROR_MESSAGE;
    }
    res.status(statusCode).json(errorData);
  }
};

function handleRequest<HandleArgs, HandleReturnType>(
  handlers: Handler<HandleArgs, HandleReturnType>[],
  ...args: HandleArgs[]
): Promise<HandleReturnType> {
  try {
    const firstHandler = buildChain(handlers);

    return firstHandler.handle(...args);
  } catch (error) {
    if (error instanceof NotHandlerFoundError) {
      throw new ApiError(501, error.message);
    }

    throw error;
  }
}

function buildChain<T, U>(handlers: Handler<T, U>[]): Handler<T, U> {
  let handler = handlers[0];
  for (let index = 0; index < handlers.length; index++) {
    handler = handler.chainWith(handlers[index]);
  }
  return handlers[0];
}

function responseError(error: Error) {
  return {
    detail: detailedStack(error),
    message: error.message || DEFAULT_ERROR_MESSAGE,
  };
}

function responseApiError(error: ApiError): {
  errorData: DefaultError;
  statusCode: number;
} {
  return {
    errorData: {
      message: error.message,
      detail: detailedStack(error),
    },
    statusCode: error.statusCode,
  };
}

function detailedStack(error: Error): unknown {
  const detailedStack = error.stack?.split("\n").map((line) => line.trim());
  // appLogger.error(error.message, detailedStack);
  if (process.env.NODE_ENV !== "development") {
    return undefined;
  }
  return detailedStack?.slice(1);
}
