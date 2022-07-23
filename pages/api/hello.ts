import type { NextApiRequest, NextApiResponse } from "next";
import { _helloCommandBuilder } from "../../application/hello/command/builder/hello.command-builder";
import { _helloApplication } from "../../application/hello/factory/hello.application-factory";
import { APIError } from "../../error";
import { ExampleData, GetExample } from "../../request-handler/handle.get";

type Data = ExampleData | { message: string; detail: unknown };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    // const helloCommand = _helloCommandBuilder.build({
    //   ...req.query,
    //   ...req.body,
    // });

    // const data = _helloApplication.exampleCommandHandler.handle(helloCommand);
    const data = new GetExample().handle({
      body: {},
      params: {},
      method: "GET",
    }) as Data;

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
