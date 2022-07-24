import { HelloCommand } from "../command/mapper/hello.command-mapper";

export type HelloDto = { name: string; envVariable: string | undefined };

export type HelloCommandHandler = {
  handle: (helloCommand: HelloCommand) => HelloDto;
};

type HelloCommandHandlerDependencies = {};

const helloCommandHandler = (
  dependencies?: HelloCommandHandlerDependencies
) => ({
  handle: (helloCommand: HelloCommand) => {
    return {
      name: helloCommand.name,
      method: helloCommand.envVariable,
    };
  },
});

export const helloApplication = Object.freeze({
  exampleCommandHandler: helloCommandHandler(),
});
