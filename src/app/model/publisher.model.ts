import {User} from "./user.model";

export interface Publisher{
  publisherId: number;
  publicName: string;
  history: string;
  user: User;
}
