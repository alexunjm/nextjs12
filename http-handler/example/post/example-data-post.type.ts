import { HelloDto } from "@application/hello/dto/hello.dto";

export type ExampleDataPOST = HelloDto & { serverTime: Date };
