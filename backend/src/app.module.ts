import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { Topic } from './topics/topic.entity';
import { Product } from './products/product.entity';
import { ArticleDraft } from './drafts/article-draft.entity';
import { ProductPiece } from './drafts/product-piece.entity';
import { CmsPublication } from './cms/cms-publication.entity';
import { AnalyticsSnapshot } from './analytics/analytics-snapshot.entity';
import { LinkRecord } from './link-monitoring/link-record.entity';
import { LinkIncident } from './link-monitoring/link-incident.entity';
import { User } from './users/user.entity';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const db = configService.getConfig().database;
        return {
          type: 'postgres',
          host: db.host,
          port: db.port,
          username: db.username,
          password: db.password,
          database: db.database,
          synchronize: false,
          logging: db.logging,
          entities: [
            Topic,
            Product,
            ArticleDraft,
            ProductPiece,
            CmsPublication,
            AnalyticsSnapshot,
            LinkRecord,
            LinkIncident,
            User,
          ],
          migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
        };
      },
    }),
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
