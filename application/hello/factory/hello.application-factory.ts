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
    return {
      name: helloCommand.name,
      method: helloCommand.envVariable,
    };
  },
});

export const helloApplication = Object.freeze({
  exampleCommandHandler: exampleCommandHandler(),
});
