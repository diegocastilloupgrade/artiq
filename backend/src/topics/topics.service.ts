import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from './topic.entity';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicsRepository: Repository<Topic>,
  ) {}

  findAll(): Promise<Topic[]> {
    return this.topicsRepository.find();
  }

  findOne(id: string): Promise<Topic | null> {
    return this.topicsRepository.findOneBy({ id });
  }

  create(data: Partial<Topic>): Promise<Topic> {
    const topic = this.topicsRepository.create(data);
    return this.topicsRepository.save(topic);
  }

  async update(id: string, data: Partial<Topic>): Promise<Topic | null> {
    await this.topicsRepository.update(id, data as any);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.topicsRepository.delete(id);
  }
}
