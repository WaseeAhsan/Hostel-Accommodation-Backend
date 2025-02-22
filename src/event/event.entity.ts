import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @Column()
  eventDate: string; // Changed to string

  @Column()
  category: string; // e.g., "Cultural", "Sports", etc.

  @Column()
  createdAt: string; // Changed to string

  @Column()
  updatedAt: string; // Changed to string
}
