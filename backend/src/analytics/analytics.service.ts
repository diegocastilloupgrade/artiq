import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnalyticsSnapshot } from './analytics-snapshot.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(AnalyticsSnapshot)
    private readonly analyticsRepository: Repository<AnalyticsSnapshot>,
  ) {}

  findAll(): Promise<AnalyticsSnapshot[]> {
    return this.analyticsRepository.find();
  }

  findOne(id: string): Promise<AnalyticsSnapshot | null> {
    return this.analyticsRepository.findOneBy({ id });
  }

  create(data: Partial<AnalyticsSnapshot>): Promise<AnalyticsSnapshot> {
    const snapshot = this.analyticsRepository.create(data);
    return this.analyticsRepository.save(snapshot);
  }

  async update(id: string, data: Partial<AnalyticsSnapshot>): Promise<AnalyticsSnapshot | null> {
    await this.analyticsRepository.update(id, data as any);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.analyticsRepository.delete(id);
  }
}
