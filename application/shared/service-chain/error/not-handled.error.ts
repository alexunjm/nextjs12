export class NotHandlerFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = NotHandlerFoundError.name;
  }
}
