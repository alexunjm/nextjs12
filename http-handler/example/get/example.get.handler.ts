import { NextApiRequest } from "next";
import { helloCommandMapper } from "@application/hello/command/mapper/hello.command-mapper";
import { helloApplication } from "@application/hello/factory/hello.application-factory";
import { HttpGetHandler } from "@application/shared/api/http-handler/http-get.handler";
import { ExampleDataGET } from "@http-handler/example/get/example-data-get.type";

class ExampleGETHandler extends HttpGetHandler<ExampleDataGET> {
  run(req: NextApiRequest): ExampleDataGET {
    const helloCommand = helloCommandMapper.requestToCommand(req);

    return helloApplication.exampleCommandHandler.handle(helloCommand);
  }
}

export const getAnExampleGETHandler = () => new ExampleGETHandler();
