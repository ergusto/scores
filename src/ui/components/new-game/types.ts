export type CurrentStepType = 1 | 2 | 3;

export const FIRST_TO = "FIRST_TO";

export const SCORE_AFTER = "SCORE_AFTER";

export type FirstToGameType = typeof FIRST_TO;

export type ScoreAfterGameType = typeof SCORE_AFTER;

export type GameTypeType = FirstToGameType | ScoreAfterGameType;

export type Step = {
  title: string;
  number: CurrentStepType;
  component: React.FunctionComponent
};
