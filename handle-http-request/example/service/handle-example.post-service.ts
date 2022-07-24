import { NextApiRequest } from "next";
import { helloCommandMapper } from "../../../application/hello/command/mapper/hello.command-mapper";
import { helloApplication } from "../../../application/hello/factory/hello.application-factory";
import { HandlePOSTService } from "../../../application/shared/api/handle-http-method/handle-post.service";

export type ExampleDataPOST = {
  name: string;
  method: string;
};

export class ExamplePOSTService extends HandlePOSTService<ExampleDataPOST> {
  execute(req: NextApiRequest) {
    const helloCommand = helloCommandMapper.nextApiRequestToCommand(req);

    return helloApplication.exampleCommandHandler.handle(helloCommand);
  }
}
