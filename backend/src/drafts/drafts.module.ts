import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleDraft } from './article-draft.entity';
import { ProductPiece } from './product-piece.entity';
import { DraftsService } from './drafts.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleDraft, ProductPiece])],
  providers: [DraftsService],
  exports: [DraftsService],
})
export class DraftsModule {}
