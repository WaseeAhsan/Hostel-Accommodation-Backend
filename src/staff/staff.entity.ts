import { Entity, Column, PrimaryGeneratedColumn, Decimal128 } from 'typeorm';


@Entity('staff')
export class Staff {
@PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  staffId: string;

  @Column()
  paymentAmmount: string;

  @Column() 
  joiningDate: string;
}
