import {
  IsString,
  IsOptional,
  IsEnum,
  IsArray,
  IsInt,
  Min,
  MaxLength,
} from 'class-validator';
import { TopicSource, TopicStatus, TopicType } from '../topic.entity';

export class UpdateTopicDto {
  @IsString()
  @IsOptional()
  @MaxLength(255)
  name?: string;

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
  @IsOptional()
  type?: TopicType;

  @IsEnum(TopicStatus)
  @IsOptional()
  status?: TopicStatus;

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
