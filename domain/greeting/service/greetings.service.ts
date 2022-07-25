export class GreetingsService {
  public getHelloMessage(personName: string): string {
    return `Hello ${personName}`;
  }
}
