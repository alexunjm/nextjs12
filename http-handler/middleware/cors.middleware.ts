import Cors from "cors";
import initMiddleware from "./init.middleware";

const allowedOrigins: string[] = ["null"];

// Only allow requests with GET, POST and OPTIONS
export const corsMiddleware = (methods: string[]) =>
  // Initialize the cors middleware
  initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
      origin: (origin, callback) => {
        return callback(null, true);
        // console.log("%c⧭", "color: #ffa640", JSON.stringify({ origin }));
        // // allow requests with no origin
        // // (like mobile apps or curl requests)
        // if (!origin) return callback(null, true);
        // if (allowedOrigins.indexOf(origin) === -1) {
        //   var msg =
        //     "The CORS policy for this site does not " +
        //     "allow access from the specified Origin.";
        //   return callback(new Error(msg), false);
        // }
        // return callback(null, true);
      },
      methods,
    })
  );
