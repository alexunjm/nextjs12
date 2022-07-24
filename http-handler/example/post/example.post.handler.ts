import { NextApiRequest, NextApiResponse } from "next";
import { helloCommandMapper } from "@application/hello/command/mapper/hello.command-mapper";
import { helloApplication } from "@application/hello/factory/hello.application-factory";
import { HttpPostHandler } from "@application/shared/api/http-handler/http-post.handler";
import { ExampleDataPOST } from "@http-handler/example/post/example-data-post.type";

class ExamplePOSTHandler extends HttpPostHandler<ExampleDataPOST> {
  run(
    ...args: (NextApiRequest | NextApiResponse<any>)[]
  ): Promise<ExampleDataPOST> {
    const [req] = args as [NextApiRequest, NextApiResponse];

    const helloCommand = helloCommandMapper.requestToCommand(req);

    return helloApplication.exampleCommandHandler.handle(helloCommand);
  }
}

export const getAnExamplePOSTHandler = () => new ExamplePOSTHandler();
