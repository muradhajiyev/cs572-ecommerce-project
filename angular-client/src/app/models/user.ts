import { Role } from "./role.enum";

export class User {
    id: number;
    email: string;
    username?: string;
    name: string;
    role: Role;
}
