import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkRecord } from './link-record.entity';
import { LinkIncident } from './link-incident.entity';
import { LinkMonitoringService } from './link-monitoring.service';

@Module({
  imports: [TypeOrmModule.forFeature([LinkRecord, LinkIncident])],
  providers: [LinkMonitoringService],
  exports: [LinkMonitoringService],
})
export class LinkMonitoringModule {}
