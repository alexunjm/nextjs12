import { NextApiRequest, NextApiResponse } from "next";
import { handleRouteWith } from "../../application/shared/api/handle-request";
import { DefaultError } from "../../application/shared/error/default.error";
import { getAnExampleGETHandler } from "../../http-request-handler/example/get/example.get.handler";
import { getAnExamplePOSTHandler } from "../../http-request-handler/example/post/example.post.handler";
import { ResponseExampleData } from "../../http-request-handler/example/response-type/response-example-data.type";

export default function (
  req: NextApiRequest,
  res: NextApiResponse<ResponseExampleData | DefaultError>
) {
  handleRouteWith(req, res, [
    getAnExampleGETHandler(),
    getAnExamplePOSTHandler(),
  ]);
}
