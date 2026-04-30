import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CmsPublication } from './cms-publication.entity';

@Injectable()
export class CmsService {
  constructor(
    @InjectRepository(CmsPublication)
    private readonly cmsRepository: Repository<CmsPublication>,
  ) {}

  findAll(): Promise<CmsPublication[]> {
    return this.cmsRepository.find();
  }

  findOne(id: string): Promise<CmsPublication | null> {
    return this.cmsRepository.findOneBy({ id });
  }

  create(data: Partial<CmsPublication>): Promise<CmsPublication> {
    const publication = this.cmsRepository.create(data);
    return this.cmsRepository.save(publication);
  }

  async update(id: string, data: Partial<CmsPublication>): Promise<CmsPublication | null> {
    await this.cmsRepository.update(id, data as any);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.cmsRepository.delete(id);
  }
}
