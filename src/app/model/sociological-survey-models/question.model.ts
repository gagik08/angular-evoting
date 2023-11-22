import {SociologicalSurvey} from "./sociological-survey.model";

export interface Question {
  sociologicalSurvey: SociologicalSurvey,
  content: string;
  numberOfOptions: number
  options: Map<string, number>;
}
