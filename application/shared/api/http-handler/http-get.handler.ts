import { NextApiRequest } from "next";
import { ChainableHandler } from "@application/shared/service-chain/handler/chainable-handler.service";

export abstract class HttpGetHandler<T> extends ChainableHandler<
  NextApiRequest,
  T
> {
  public canHandle(req: NextApiRequest): boolean {
    return req.method === "GET";
  }
}
