import { exampleCommandHandler } from "@application/hello/command/handler/example.command.handler";
import { ExampleCommandHandlerDependencies } from "@application/hello/command/handler/dependencies/example-command-handler.dependencies";

const exampleCommandHandlerDependencies: ExampleCommandHandlerDependencies = {};

export const helloApplication = Object.freeze({
  exampleCommandHandler: exampleCommandHandler(
    exampleCommandHandlerDependencies
  ),
});
