import { HelloCommand } from "../command/builder/hello.command-builder";

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
      name: "John Doe 1",
      envVariable: process.env.SOME_VARIABLE,
    };
  },
});

export const _helloApplication = Object.freeze({
  exampleCommandHandler: helloCommandHandler(),
});
