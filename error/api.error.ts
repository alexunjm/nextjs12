export class APIError extends Error {
  public detail: unknown;

  constructor(public readonly httpStatusCode: number, error: Error) {
    super("An error occurred processing your request.");

    this.detail = error.message;
    this.name = APIError.name;

    console.error(error.stack);
  }
}
