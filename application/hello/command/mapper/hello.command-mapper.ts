import { HelloCommand } from "@application/hello/command/hello.command";
import { ApplicationRequest } from "@application/shared/request/application-request";

export const helloCommandMapper = {
  requestToCommand: (data: ApplicationRequest): HelloCommand => {
    return {
      name: (data.query["name"] as string) || "Sir",
      method: data.method || "",
    };
  },
};
