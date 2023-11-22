import {Category} from "../category.model";
import {Publisher} from "../publisher.model";
import {ReferendumQuestion} from "./referendum-question.model";

export interface Referendum{
  referendumId: number;
  title: string;
  description: string;
  category:Category
  publisher:Publisher
  referendumQuestion: ReferendumQuestion;
}
