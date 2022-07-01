export type PromptOption = {
  type: string;
  name: string;
  message: string;

  // optional
  skip: boolean;
  initial: string;
  format: function;
  result: function;
  validate: function;
};
