import { NextApiRequest, NextApiResponse } from "next";
import { handleRouteWith } from "@application/shared/api/handle-request";
import { DefaultError } from "@application/shared/error/types";
import { getAnExampleGETHandler } from "@http-handler/example/get/example.get.handler";
import { getAnExamplePOSTHandler } from "@http-handler/example/post/example.post.handler";
import { ResponseExampleData } from "@http-handler/example/response-type/response-example-data.type";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<ResponseExampleData | DefaultError>
) {
  await handleRouteWith(req, res, [
    getAnExampleGETHandler(),
    getAnExamplePOSTHandler(),
  ]);
}
