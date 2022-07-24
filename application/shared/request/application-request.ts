export type ApplicationRequest = {
  query: Partial<{
    [key: string]: string | string[];
  }>;
  body: unknown;
  method?: string | undefined;
};
