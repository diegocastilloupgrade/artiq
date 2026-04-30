import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CmsPublication } from './cms-publication.entity';
import { CmsService } from './cms.service';

@Module({
  imports: [TypeOrmModule.forFeature([CmsPublication])],
  providers: [CmsService],
  exports: [CmsService],
})
export class CmsModule {}
