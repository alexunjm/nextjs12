import { ExampleDataGET } from "@http-handler/example/get/example-data-get.type";
import { ExampleDataPOST } from "@http-handler/example/post/example-data-post.type";

export type ResponseExampleData = ExampleDataGET | ExampleDataPOST;
