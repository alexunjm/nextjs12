import { NextApiRequest } from "next";

export type HelloCommand = {
  name: string;
  envVariable: string;
};

export const _helloCommandBuilder = {
  build: (data: NextApiRequest): HelloCommand => {
    return {
      name: "John Doe",
      envVariable: data.method || process.env.SOME_VARIABLE || "",
    };
  },
};
