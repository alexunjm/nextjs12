export type CommandHandler<Command, HandlerDtoReturn> = {
  handle: (command: Command) => Promise<HandlerDtoReturn>;
};
