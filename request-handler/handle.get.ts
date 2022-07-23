import { ConcreteHandler } from "../application/chain.service";

export type ExampleData = {
  name: string;
  method: string;
};
export class GetExample extends ConcreteHandler<
  { params: any; body: any; method: string },
  ExampleData
> {
  public canHandle({ method }: { method: string }): boolean {
    return method === "GET";
  }

  public handleImpl(params: { method: string }) {
    const data: ExampleData = {
      name: "John Doe",
      method: params.method,
    };
    return data;
  }
}
