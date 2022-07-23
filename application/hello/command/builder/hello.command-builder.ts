export type HelloCommand = {
  name: string;
  envVariable: string | undefined;
};

export const _helloCommandBuilder = {
  build: (data: unknown): HelloCommand => {
    throw new Error("Not implemented");
    // return { name: "John Doe", envVariable: process.env.SOME_VARIABLE };
  },
};
