import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stat')
export class Stat {
  @PrimaryGeneratedColumn()
  stat_id: number;

  @Column()
  strength: number;

  @Column()
  intelligence: number;

  @Column()
  speed: number;

  @Column()
  charisma: number;

  @Column()
  health: number;

  @Column()
  luck: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
