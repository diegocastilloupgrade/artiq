import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsArray,
  IsInt,
  Min,
  MaxLength,
} from 'class-validator';
import { TopicSource, TopicType } from '../topic.entity';

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TopicSource)
  @IsOptional()
  source?: TopicSource;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  source_name?: string;

  @IsEnum(TopicType)
  @IsNotEmpty()
  type: TopicType;

  @IsInt()
  @Min(0)
  @IsOptional()
  priority?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  relevant_dates?: string[];

  @IsString()
  @IsOptional()
  internal_notes?: string;
}
