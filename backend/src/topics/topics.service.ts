import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic, TopicSource, TopicStatus, TopicType } from './topic.entity';

@Injectable()
export class TopicsService implements OnModuleInit {
  private readonly logger = new Logger(TopicsService.name);

  constructor(
    @InjectRepository(Topic)
    private readonly topicsRepository: Repository<Topic>,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.seedTopicsIfEmpty();
  }

  private async seedTopicsIfEmpty(): Promise<void> {
    const currentCount = await this.topicsRepository.count();

    if (currentCount > 0) {
      return;
    }

    const sampleTopics: Array<Partial<Topic>> = [
      {
        name: 'Mejores portatiles ultraligeros para teletrabajo',
        description: 'Comparativa de equipos ligeros para productividad diaria.',
        source: TopicSource.MANUAL,
        source_name: 'backoffice',
        type: TopicType.EVERGREEN,
        status: TopicStatus.CANDIDATE,
        priority: 1,
        tags: ['portatiles', 'teletrabajo', 'productividad'],
        relevant_dates: null,
        internal_notes: 'Buen candidato para afiliacion Amazon.',
      },
      {
        name: 'Ofertas gaming para Prime Day 2026',
        description: 'Productos y accesorios gaming con alto volumen de busqueda.',
        source: TopicSource.EXTERNAL,
        source_name: 'google-trends',
        type: TopicType.SEASONAL,
        status: TopicStatus.CANDIDATE,
        priority: 2,
        tags: ['prime-day', 'gaming', 'ofertas'],
        relevant_dates: ['2026-07-10', '2026-07-17'],
        internal_notes: null,
      },
      {
        name: 'Guia de auriculares con cancelacion de ruido',
        description: 'Seleccion de modelos para oficina, viaje y estudio.',
        source: TopicSource.MANUAL,
        source_name: 'editorial',
        type: TopicType.EVERGREEN,
        status: TopicStatus.IN_PROGRESS,
        priority: 0,
        tags: ['auriculares', 'audio', 'tecnologia'],
        relevant_dates: null,
        internal_notes: 'Relacionar con categoria Audio en CMS.',
      },
      {
        name: 'Regreso a clases 2026: tecnologia imprescindible',
        description: 'Lista de dispositivos utiles para estudiantes.',
        source: TopicSource.EXTERNAL,
        source_name: 'google-trends',
        type: TopicType.SEASONAL,
        status: TopicStatus.CANDIDATE,
        priority: 1,
        tags: ['back-to-school', 'estudiantes', 'tecnologia'],
        relevant_dates: ['2026-08-20'],
        internal_notes: null,
      },
      {
        name: 'Mundial 2026: gadgets para ver partidos en casa',
        description: 'Tematica de evento para campañas de conversion.',
        source: TopicSource.EXTERNAL,
        source_name: 'google-trends',
        type: TopicType.EVENT,
        status: TopicStatus.CANDIDATE,
        priority: 3,
        tags: ['mundial', 'smart-tv', 'deporte'],
        relevant_dates: ['2026-06-11', '2026-07-19'],
        internal_notes: 'Evaluar subida de prioridad en fase de evento.',
      },
    ];

    await this.topicsRepository.save(this.topicsRepository.create(sampleTopics));
    this.logger.log(`Seeded ${sampleTopics.length} topics`);
  }

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
