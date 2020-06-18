import { Role } from './role.enum';

export class User {
  id: number;
  userId: string;
  email: string;
  username?: string;
  name: string;
  role: Role;
}
