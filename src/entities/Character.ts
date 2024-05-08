import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Equipment } from './Equipment';
import { User } from './User';
import { Stat } from './Stat';
import { Bag } from './Bag';

@Entity('character')
export class Character {
  @PrimaryGeneratedColumn()
  character_id: number;

  @ManyToOne(() => User, (user) => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user_id: Relation<User>;

  @OneToOne(() => Equipment, (equipment) => equipment.equipment_id)
  @JoinColumn({ name: 'equipment_id' })
  equipment_id: Relation<Equipment>;

  @OneToOne(() => Stat, (stat) => stat.stat_id)
  @JoinColumn({ name: 'stat_id' })
  stat_id: Relation<Stat>;

  @OneToOne(() => Bag, (bag) => bag.bag_id)
  @JoinColumn({ name: 'bag_id' })
  bag_id: Relation<Bag>;

  @Column({ type: 'text', nullable: true })
  picture: string;

  @Column({ nullable: true })
  level: number;

  @Column({ nullable: true })
  experience: number;

  @Column({ nullable: true })
  money: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
