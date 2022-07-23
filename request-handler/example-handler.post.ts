import { NextApiRequest } from "next";
import { ConcreteHandler } from "../application/chain.service";
import { _helloCommandBuilder } from "../application/hello/command/builder/hello.command-builder";
import { _helloApplication } from "../application/hello/factory/hello.application-factory";

export type ExampleData = {
  name: string;
  method: string;
};
export class PostExampleHandler extends ConcreteHandler<
  NextApiRequest,
  ExampleData
> {
  public canHandle(req: NextApiRequest): boolean {
    return req.method === "POST";
  }

  public handleImpl(req: NextApiRequest) {
    const helloCommand = _helloCommandBuilder.build(req);

    return _helloApplication.exampleCommandHandler.handle(helloCommand);
  }
}
