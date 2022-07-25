import { GreetingsService } from "@domain/greeting/service/greetings.service";

export type ExampleCommandHandlerDependencies = {
  greetingsService: GreetingsService;
};
