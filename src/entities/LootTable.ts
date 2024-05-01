import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  CHARM_TYPE_LIST,
  LOOT_TYPE_LIST,
  RARITY_LIST,
} from '../utils/constants';

@Entity('loot_table')
export class LootTable {
  @PrimaryGeneratedColumn()
  loot_table_id: number;

  @Column('enum', {
    enum: LOOT_TYPE_LIST,
  })
  type: string;

  @Column('text', { nullable: true })
  picture: string;

  @Column('text', { nullable: true })
  fight_picture: string;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column('enum', { enum: RARITY_LIST })
  rarity: string;

  @Column({ nullable: true })
  damage_min: number;

  @Column({ nullable: true })
  damage_max: number;

  @Column({ nullable: true })
  armor_min: number;

  @Column({ nullable: true })
  armor_max: number;

  @Column({ nullable: true })
  strength_min: number;

  @Column({ nullable: true })
  strength_max: number;

  @Column({ nullable: true })
  intelligence_min: number;

  @Column({ nullable: true })
  intelligence_max: number;

  @Column({ nullable: true })
  speed_min: number;

  @Column({ nullable: true })
  speed_max: number;

  @Column({ nullable: true })
  charisma_min: number;

  @Column({ nullable: true })
  charisma_max: number;

  @Column({ nullable: true })
  health_min: number;

  @Column({ nullable: true })
  health_max: number;

  @Column({ nullable: true })
  luck_min: number;

  @Column({ nullable: true })
  luck_max: number;

  @Column()
  charm: boolean;

  @Column({
    type: 'enum',
    enum: CHARM_TYPE_LIST,
    nullable: true,
  })
  charm_type: string;

  @Column({ nullable: true })
  charm_value: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
