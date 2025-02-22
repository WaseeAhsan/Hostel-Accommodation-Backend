import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Billing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar',  length: 50})
  user_id: string;

  @Column({ type: 'varchar', length: 50 })
  room_type: string;

  @Column() // just yes or no will input from user
  meal_purchase: string;

  @Column({ type: 'decimal' })
  total: number;
}
