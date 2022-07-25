// Helper method to wait for a middleware to execute before continuing

import { CorsRequest } from "cors";

// And to throw an error when an error happens in a middleware
export default function initMiddleware(middleware: {
  (
    req: CorsRequest,
    res: {
      statusCode?: number | undefined;
      setHeader(key: string, value: string): any;
      end(): any;
    },
    next: (err?: any) => any
  ): void;
  (arg0: any, arg1: any, arg2: (result: unknown) => void): void;
}) {
  return (req: any, res: any) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: unknown) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}
