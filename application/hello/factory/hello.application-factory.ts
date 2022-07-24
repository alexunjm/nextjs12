import { HelloCommand } from "@application/hello/command/hello.command";

export type HelloDto = { name: string; envVariable: string | undefined };

export type HelloCommandHandler = {
  handle: (helloCommand: HelloCommand) => HelloDto;
};

type ExampleCommandHandlerDependencies = {};

const exampleCommandHandler = (
  dependencies?: ExampleCommandHandlerDependencies
) => ({
  handle: (helloCommand: HelloCommand) => {
    return Promise.resolve({
      name: "hello " + helloCommand.name,
      method: helloCommand.method,
    });
  },
});

export const helloApplication = Object.freeze({
  exampleCommandHandler: exampleCommandHandler(),
});
