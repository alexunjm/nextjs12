import { NextApiRequest, NextApiResponse } from "next";
import { ChainableHandler } from "@application/shared/service-chain/handler/chainable-handler";

export class HttpHandler<T> extends ChainableHandler<
  NextApiRequest | NextApiResponse,
  T
> {
  constructor(
    public readonly verb: string,
    runnable: {
      run: (...args: (NextApiRequest | NextApiResponse<any>)[]) => Promise<T>;
    }
  ) {
    super(runnable);
  }

  canHandle(...args: (NextApiRequest | NextApiResponse<any>)[]): boolean {
    const [req] = args as [NextApiRequest, NextApiResponse];
    return req.method === this.verb;
  }
}
