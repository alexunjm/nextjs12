import { NextApiRequest } from "next";
import { ChainableHandler } from "@application/shared/service-chain/handler/chainable-handler";

export abstract class HttpPostHandler<T> extends ChainableHandler<
  NextApiRequest,
  T
> {
  public canHandle(req: NextApiRequest): boolean {
    return req.method === "POST";
  }
}
