export type CurrentStepType = 1 | 2 | 3;

export type GameTypeType = "ft" | "sa";

export type Step = {
  title: string;
  number: CurrentStepType;
  component: React.FunctionComponent
};
