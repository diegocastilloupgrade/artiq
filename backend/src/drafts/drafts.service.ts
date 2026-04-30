import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleDraft } from './article-draft.entity';
import { ProductPiece } from './product-piece.entity';

@Injectable()
export class DraftsService {
  constructor(
    @InjectRepository(ArticleDraft)
    private readonly draftsRepository: Repository<ArticleDraft>,
    @InjectRepository(ProductPiece)
    private readonly productPiecesRepository: Repository<ProductPiece>,
  ) {}

  findAllDrafts(): Promise<ArticleDraft[]> {
    return this.draftsRepository.find();
  }

  findOneDraft(id: string): Promise<ArticleDraft | null> {
    return this.draftsRepository.findOneBy({ id });
  }

  createDraft(data: Partial<ArticleDraft>): Promise<ArticleDraft> {
    const draft = this.draftsRepository.create(data);
    return this.draftsRepository.save(draft);
  }

  async updateDraft(id: string, data: Partial<ArticleDraft>): Promise<ArticleDraft | null> {
    await this.draftsRepository.update(id, data as any);
    return this.findOneDraft(id);
  }

  async removeDraft(id: string): Promise<void> {
    await this.draftsRepository.delete(id);
  }

  findAllProductPieces(): Promise<ProductPiece[]> {
    return this.productPiecesRepository.find();
  }

  findOneProductPiece(id: string): Promise<ProductPiece | null> {
    return this.productPiecesRepository.findOneBy({ id });
  }

  createProductPiece(data: Partial<ProductPiece>): Promise<ProductPiece> {
    const piece = this.productPiecesRepository.create(data);
    return this.productPiecesRepository.save(piece);
  }

  async updateProductPiece(id: string, data: Partial<ProductPiece>): Promise<ProductPiece | null> {
    await this.productPiecesRepository.update(id, data as any);
    return this.findOneProductPiece(id);
  }

  async removeProductPiece(id: string): Promise<void> {
    await this.productPiecesRepository.delete(id);
  }
}
