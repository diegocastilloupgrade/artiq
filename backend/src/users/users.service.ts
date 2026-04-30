import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.interface';
import { UserRole } from '../auth/user-role.enum';

/**
 * In-memory user store with seed users.
 * This service is designed to be replaced by a TypeORM-backed implementation in T-2.01.
 */
@Injectable()
export class UsersService implements OnModuleInit {
  private readonly logger = new Logger(UsersService.name);
  private readonly users: Map<string, User> = new Map();

  async onModuleInit(): Promise<void> {
    await this.seedUsers();
  }

  private async seedUsers(): Promise<void> {
    const saltRounds = 10;

    const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'Admin@123456';
    const redactorPassword = process.env.SEED_REDACTOR_PASSWORD || 'Redactor@123456';

    const adminHash = await bcrypt.hash(adminPassword, saltRounds);
    const redactorHash = await bcrypt.hash(redactorPassword, saltRounds);

    const seedUsers: User[] = [
      { id: '1', username: 'admin', passwordHash: adminHash, role: UserRole.ADMIN },
      { id: '2', username: 'redactor', passwordHash: redactorHash, role: UserRole.REDACTOR },
    ];

    for (const user of seedUsers) {
      this.users.set(user.username, user);
    }

    this.logger.log(`Seeded ${seedUsers.length} users`);
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.get(username);
  }
}
