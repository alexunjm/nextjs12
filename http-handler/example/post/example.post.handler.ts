import { NextApiRequest, NextApiResponse } from "next";
import { helloCommandMapper } from "@application/hello/command/mapper/hello.command-mapper";
import { helloApplication } from "@application/hello/factory/hello.application-factory";
import { ExampleDataPOST } from "@http-handler/example/post/example-data-post.type";
import { HttpHandler } from "@application/shared/api/http.handler";

export const getAnExamplePOSTHandler = () =>
  new HttpHandler<ExampleDataPOST>("POST", {
    run: (
      ...args: (NextApiRequest | NextApiResponse<any>)[]
    ): Promise<ExampleDataPOST> => {
      const [req] = args as [NextApiRequest, NextApiResponse];

      const helloCommand = helloCommandMapper.requestToCommand(req);

      return helloApplication.exampleCommandHandler.handle(helloCommand);
    },
  });
