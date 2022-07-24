import { NextApiRequest, NextApiResponse } from "next";
import { helloCommandMapper } from "@application/hello/command/mapper/hello.command-mapper";
import { helloApplication } from "@application/hello/factory/hello.application-factory";
import { ExampleDataGET } from "@http-handler/example/get/example-data-get.type";
import { HttpHandler } from "@application/shared/api/http.handler";

export const getAnExampleGETHandler = () =>
  new HttpHandler<ExampleDataGET>("GET", {
    run: (
      ...args: (NextApiRequest | NextApiResponse<ExampleDataGET>)[]
    ): Promise<ExampleDataGET> => {
      const [req] = args as [NextApiRequest, NextApiResponse];

      const helloCommand = helloCommandMapper.requestToCommand(req);

      return helloApplication.exampleCommandHandler.handle(helloCommand);
    },
  });
