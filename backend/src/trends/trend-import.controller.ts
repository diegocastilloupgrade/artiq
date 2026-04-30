import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/user-role.enum';
import { TrendImportService } from './trend-import.service';

@Controller('trends')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class TrendImportController {
  constructor(private readonly trendImportService: TrendImportService) {}

  @Post('import')
  async importTopics(): Promise<{ imported: number; skipped: number }> {
    return this.trendImportService.importTopics();
  }
}
