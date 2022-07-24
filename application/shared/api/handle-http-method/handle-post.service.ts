import { NextApiRequest } from "next";
import { ExecuteHandlerService } from "../../service-chain/handler/execute-handler.service";

export abstract class HandlePOSTService<T> extends ExecuteHandlerService<
  NextApiRequest,
  T
> {
  public canHandle(req: NextApiRequest): boolean {
    return req.method === "POST";
  }
}
