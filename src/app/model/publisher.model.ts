import {User} from "./user.model";

export interface Publisher{
  publisherId: number;
  publicName: string;
  founder: string;
  user: User;
}
