import type { NextApiRequest, NextApiResponse } from "next";
import { handleRequest } from "../../application/shared/api/handle-request";
import { APIError } from "../../application/shared/error";
import {
  ExampleDataGET,
  ExampleGETService,
} from "../../handle-http-request/example/example.get.handler";
import {
  ExampleDataPOST,
  ExamplePOSTHandler,
} from "../../handle-http-request/example/example.post.handler";

type Data =
  | ExampleDataGET
  | ExampleDataPOST
  | { message: string; detail: unknown };

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const getHandler = new ExampleGETService();
    const postHandler = new ExamplePOSTHandler();

    const chain = [getHandler, postHandler];

    const data = handleRequest(req, chain);

    res.status(200).json(data);
  } catch (error) {
    const apiError =
      error instanceof APIError ? error : new APIError(500, error as Error);

    res.status(apiError.httpStatusCode).json({
      message: apiError.message,
      detail: apiError.detail,
    });
  }
}
