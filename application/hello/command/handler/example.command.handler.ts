import { CommandHandler } from "@application/command-handler/command.handler";
import { ExampleCommandHandlerDependencies } from "@application/hello/command/handler/dependencies/example-command-handler.dependencies";
import { HelloCommand } from "@application/hello/command/hello.command";
import { HelloDto } from "@application/hello/dto/hello.dto";

export const exampleCommandHandler = ({
  greetingsService,
}: ExampleCommandHandlerDependencies): CommandHandler<
  HelloCommand,
  HelloDto
> => ({
  handle: (helloCommand: HelloCommand) => {
    return Promise.resolve({
      message: greetingsService.getHelloMessage(helloCommand.name),
      method: helloCommand.method,
    });
  },
});
