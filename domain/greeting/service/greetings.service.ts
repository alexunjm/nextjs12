import { HelloMessage } from "../model/hello.model";

export class GreetingsService {
  public getHelloMessage(personName: string): HelloMessage {
    return `Hello ${personName}`;
  }
}
