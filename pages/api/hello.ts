import type { NextApiRequest, NextApiResponse } from "next";
import { Handler } from "../../application/chain.service";
import { _helloCommandBuilder } from "../../application/hello/command/builder/hello.command-builder";
import { _helloApplication } from "../../application/hello/factory/hello.application-factory";
import { APIError } from "../../error";
import {
  ExampleData,
  GetExampleHandler,
} from "../../request-handler/example-handler.get";
import { PostExampleHandler } from "../../request-handler/example-handler.post";

type Data = ExampleData | { message: string; detail: unknown };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const firstHandler = chainHandlers([
      new GetExampleHandler(),
      new PostExampleHandler(),
    ]);
    const data = firstHandler.handle(req) as Data;

    res.status(200).json(data);
  } catch (error) {
    const apiError =
      error instanceof APIError ? error : new APIError(500, error as Error);

    res.status(apiError.httpStatusCode).json({
      message: apiError.message,
      detail: apiError.detail,
    });
  }

  function chainHandlers(handlers: Handler<any, any>[]) {
    let handler = handlers[0];
    for (let index = 0; index < handlers.length; index++) {
      handler = handler.chainWith(handlers[index]);
    }
    return handlers[0];
  }
}
