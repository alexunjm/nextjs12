export type HelloCommand = {
  name: string;
  envVariable: string;
};

export const helloCommandMapper = {
  requestToCommand: (data: {
    query: Partial<{
      [key: string]: string | string[];
    }>;
    body: any;
    method?: string | undefined;
  }): HelloCommand => {
    return {
      name: "Alex",
      envVariable: data.method || process.env.SOME_VARIABLE || "",
    };
  },
};
