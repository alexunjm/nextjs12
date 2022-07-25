import { GreetingsService } from "./greetings.service";

export const greetingsServiceProvider = {
  getInstance: (): GreetingsService => {
    return new GreetingsService();
  },
};
