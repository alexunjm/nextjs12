import { NextApiRequest } from "next";
import { helloCommandMapper } from "../../../application/hello/command/mapper/hello.command-mapper";
import { helloApplication } from "../../../application/hello/factory/hello.application-factory";
import { HandleGETService } from "../../../application/shared/api/handle-http-method/handle-get.service";

export type ExampleDataGET = {
  name: string;
  method: string;
};

export class ExampleGETService extends HandleGETService<ExampleDataGET> {
  execute(req: NextApiRequest) {
    const helloCommand = helloCommandMapper.requestToCommand(req);

    return helloApplication.exampleCommandHandler.handle(helloCommand);
  }
}
