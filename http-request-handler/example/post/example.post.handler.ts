import { NextApiRequest } from "next";
import { helloCommandMapper } from "../../../application/hello/command/mapper/hello.command-mapper";
import { helloApplication } from "../../../application/hello/factory/hello.application-factory";
import { HttpPostHandler } from "../../../application/shared/api/http-handler/http-post.handler";
import { ExampleDataPOST } from "./example-data-post.type";

class ExamplePOSTHandler extends HttpPostHandler<ExampleDataPOST> {
  run(req: NextApiRequest): ExampleDataPOST {
    const helloCommand = helloCommandMapper.requestToCommand(req);

    return helloApplication.exampleCommandHandler.handle(helloCommand);
  }
}

export const getAnExamplePOSTHandler = () => new ExamplePOSTHandler();
