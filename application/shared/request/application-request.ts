export type ApplicationRequest = {
  query: Partial<{
    [key: string]: string | string[];
  }>;
  body: any;
  method?: string | undefined;
};
