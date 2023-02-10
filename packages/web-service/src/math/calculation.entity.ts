import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'calculations',
})
export class Calculation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  operation: string;

  @Column('simple-array')
  operands: number[];

  @Column()
  result: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
