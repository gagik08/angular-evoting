import { User } from './user.model';

export interface Voter {
  voterId: number;
  firstName: string;
  lastName: string;
  user: User;
}
