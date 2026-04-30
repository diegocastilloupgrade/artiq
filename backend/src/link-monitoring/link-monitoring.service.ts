import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LinkRecord } from './link-record.entity';
import { LinkIncident } from './link-incident.entity';

@Injectable()
export class LinkMonitoringService {
  constructor(
    @InjectRepository(LinkRecord)
    private readonly linkRecordsRepository: Repository<LinkRecord>,
    @InjectRepository(LinkIncident)
    private readonly linkIncidentsRepository: Repository<LinkIncident>,
  ) {}

  findAllLinkRecords(): Promise<LinkRecord[]> {
    return this.linkRecordsRepository.find();
  }

  findOneLinkRecord(id: string): Promise<LinkRecord | null> {
    return this.linkRecordsRepository.findOneBy({ id });
  }

  createLinkRecord(data: Partial<LinkRecord>): Promise<LinkRecord> {
    const record = this.linkRecordsRepository.create(data);
    return this.linkRecordsRepository.save(record);
  }

  async updateLinkRecord(id: string, data: Partial<LinkRecord>): Promise<LinkRecord | null> {
    await this.linkRecordsRepository.update(id, data as any);
    return this.findOneLinkRecord(id);
  }

  async removeLinkRecord(id: string): Promise<void> {
    await this.linkRecordsRepository.delete(id);
  }

  findAllLinkIncidents(): Promise<LinkIncident[]> {
    return this.linkIncidentsRepository.find();
  }

  findOneLinkIncident(id: string): Promise<LinkIncident | null> {
    return this.linkIncidentsRepository.findOneBy({ id });
  }

  createLinkIncident(data: Partial<LinkIncident>): Promise<LinkIncident> {
    const incident = this.linkIncidentsRepository.create(data);
    return this.linkIncidentsRepository.save(incident);
  }

  async updateLinkIncident(id: string, data: Partial<LinkIncident>): Promise<LinkIncident | null> {
    await this.linkIncidentsRepository.update(id, data as any);
    return this.findOneLinkIncident(id);
  }

  async removeLinkIncident(id: string): Promise<void> {
    await this.linkIncidentsRepository.delete(id);
  }
}
