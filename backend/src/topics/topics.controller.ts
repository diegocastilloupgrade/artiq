import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/user-role.enum';
import { TopicSource } from './topic.entity';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.REDACTOR, UserRole.ADMIN)
@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  create(@Body(new ValidationPipe({ whitelist: true })) dto: CreateTopicDto) {
    const source = dto.source ?? TopicSource.MANUAL;
    return this.topicsService.create({ ...dto, source });
  }

  @Get()
  findAll() {
    return this.topicsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const topic = await this.topicsService.findOne(id);
    if (!topic) {
      throw new NotFoundException(`Topic ${id} not found`);
    }
    return topic;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: true })) dto: UpdateTopicDto,
  ) {
    const topic = await this.topicsService.update(id, dto);
    if (!topic) {
      throw new NotFoundException(`Topic ${id} not found`);
    }
    return topic;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const topic = await this.topicsService.findOne(id);
    if (!topic) {
      throw new NotFoundException(`Topic ${id} not found`);
    }
    await this.topicsService.remove(id);
  }
}
