import { UserRole } from '../auth/user-role.enum';

/**
 * In-memory user representation.
 * Designed to be replaced by a TypeORM User entity in T-2.01.
 */
export interface User {
  id: string;
  username: string;
  passwordHash: string;
  role: UserRole;
}
