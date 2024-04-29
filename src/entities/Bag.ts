import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bag')
export class Bag {
  @PrimaryGeneratedColumn()
  bag_id: number;

  @Column()
  length: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
