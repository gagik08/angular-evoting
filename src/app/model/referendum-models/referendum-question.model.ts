import {Referendum} from "./referendum.model";

export interface ReferendumQuestion{
  referendum: Referendum;
  optionFor: string;
  optionAgainst: string;
  votesFor: number;
  votesAgainst: number;
}
