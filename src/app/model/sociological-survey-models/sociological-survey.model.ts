import {Publisher} from "../publisher.model";
import {Category} from "../category.model";
import {Question} from "./question.model";

export interface SociologicalSurvey{
  sociologicalSurveyId: number;
  title: string;
  description: string;
  category: Category;
  publisher: Publisher;
  question: Question[];

}
