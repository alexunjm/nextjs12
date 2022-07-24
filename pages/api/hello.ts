import type { NextApiRequest, NextApiResponse } from "next";
import { processRequest } from "../../application/shared/api/process-request";
import { APIError } from "../../error";
import {
  ExampleDataGET,
  ExampleGETService,
} from "../../handle-http-request/example/service/handle-example.get-service";
import {
  ExampleDataPOST,
  ExamplePOSTService,
} from "../../handle-http-request/example/service/handle-example.post-service";

type Data =
  | ExampleDataGET
  | ExampleDataPOST
  | { message: string; detail: unknown };

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const chain = [new ExampleGETService(), new ExamplePOSTService()];
    const data = processRequest(req, chain);

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
