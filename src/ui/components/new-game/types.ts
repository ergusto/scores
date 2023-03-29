export type CurrentStepType = 1 | 2 | 3;

export type FirstToGameType = "FIRST_TO";

export type ScoreAfterGameType = "SCORE_AFTER";

export type GameTypeType = FirstToGameType | ScoreAfterGameType;

export type Step = {
  title: string;
  number: CurrentStepType;
  component: React.FunctionComponent
};
