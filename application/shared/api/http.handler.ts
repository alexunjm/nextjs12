import { NextApiRequest, NextApiResponse } from "next";
import { ChainableHandler } from "@application/shared/service-chain/handler/chainable-handler";

export class HttpHandler<RunnableResultType> extends ChainableHandler<
  NextApiRequest | NextApiResponse,
  RunnableResultType
> {
  constructor(
    public readonly verb: string,
    runnable: {
      run: (
        ...args: (NextApiRequest | NextApiResponse<RunnableResultType>)[]
      ) => Promise<RunnableResultType>;
    }
  ) {
    super(runnable, `Request not handled`);
  }

  canHandle(
    ...args: (NextApiRequest | NextApiResponse<RunnableResultType>)[]
  ): boolean {
    const [req] = args as [NextApiRequest, NextApiResponse];
    return req.method === this.verb;
  }
}
