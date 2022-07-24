import { NextApiRequest, NextApiResponse } from "next";
import { ChainableHandler } from "@application/shared/service-chain/handler/chainable-handler";

export abstract class HttpGetHandler<T> extends ChainableHandler<
  NextApiRequest | NextApiResponse,
  T
> {
  canHandle(...args: (NextApiRequest | NextApiResponse<any>)[]): boolean {
    const [req] = args as [NextApiRequest, NextApiResponse];
    return req.method === "GET";
  }
}
