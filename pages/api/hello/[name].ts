import { NextApiRequest, NextApiResponse } from "next";
import { handleRouteWith } from "@application/shared/api/handle-request";
import { DefaultError } from "@application/shared/error/types";
import {
  exampleHttpHandlers,
  ResponseExampleData,
} from "@http-handler/example";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<ResponseExampleData | DefaultError>
) {
  await handleRouteWith(req, res, exampleHttpHandlers);
}
