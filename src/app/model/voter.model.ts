import { User } from './user.model';

export interface Voter {
  voterId: number;
  fullName: string;
  user: User;
}
