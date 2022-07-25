import { exampleCommandHandler } from "@application/hello/command/handler/example.command.handler";
import { ExampleCommandHandlerDependencies } from "@application/hello/command/handler/dependencies/example-command-handler.dependencies";
import { GreetingsService } from "@domain/greeting/service/greetings.service";

const exampleCommandHandlerDependencies: ExampleCommandHandlerDependencies = {
  greetingsService: new GreetingsService(),
};

export const helloApplication = Object.freeze({
  exampleCommandHandler: exampleCommandHandler(
    exampleCommandHandlerDependencies
  ),
});
