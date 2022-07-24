import { HelloCommand } from "@application/hello/command/hello.command";
import { ApplicationRequest } from "@application/shared/request/application-request";

export const helloCommandMapper = {
  requestToCommand: (data: ApplicationRequest): HelloCommand => {
    return {
      name: "Alex",
      envVariable: data.method || process.env.SOME_VARIABLE || "",
    };
  },
};
