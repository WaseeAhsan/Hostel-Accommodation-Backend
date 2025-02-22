import { IsString, IsOptional } from 'class-validator';

export class EventDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  eventDate?: string; // Changed to string

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  category?: string; // e.g., "Cultural", "Sports", etc.

  @IsString()
  @IsOptional()
  createdAt?: string; // Changed to string

  @IsString()
  @IsOptional()
  updatedAt?: string; // Changed to string
}
