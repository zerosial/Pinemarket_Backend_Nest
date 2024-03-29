import { Post, Role } from '@prisma/client';

export class UserResponseDto {
  id: string;
  email: string;
  username?: string;
  role: Role;
  posts?: [Post] | null;
}
