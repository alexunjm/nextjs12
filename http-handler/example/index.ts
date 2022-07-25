import { getAnExampleGETHandler } from "@http-handler/example/get/example.get.handler";
import { getAnExamplePOSTHandler } from "@http-handler/example/post/example.post.handler";
import { ResponseExampleData } from "@http-handler/example/response-type/response-example-data.type";

const exampleHttpHandlers = [
  getAnExampleGETHandler(),
  getAnExamplePOSTHandler(),
];

export { exampleHttpHandlers, type ResponseExampleData };
