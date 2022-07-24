import { NextApiRequest } from "next";

export type HelloCommand = {
  name: string;
  envVariable: string;
};

export const helloCommandMapper = {
  nextApiRequestToCommand: (data: NextApiRequest): HelloCommand => {
    return {
      name: "Alex",
      envVariable: data.method || process.env.SOME_VARIABLE || "",
    };
  },
};
