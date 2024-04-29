import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { LootTable } from './LootTable';
import { Bag } from './Bag';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  item_id: number;

  @OneToOne(() => LootTable, (loot) => loot.loot_id)
  @JoinColumn({ name: 'loot_id' })
  loot_id: Relation<LootTable>;

  @OneToOne(() => Bag, (bag) => bag.bag_id)
  @JoinColumn({ name: 'bag_id' })
  bag_id: Relation<Bag>;

  @Column()
  level: number;

  @Column('enum', { enum: ['common', 'uncommun', 'rare', 'epic', 'legendary'] })
  rarity: string;

  @Column({ nullable: true })
  strength: number;

  @Column({ nullable: true })
  intelligence: number;

  @Column({ nullable: true })
  speed: number;

  @Column({ nullable: true })
  charisma: number;

  @Column({ nullable: true })
  health: number;

  @Column({ nullable: true })
  luck: number;

  @Column()
  charm: boolean;

  @Column({
    type: 'enum',
    enum: ['xp_boost', 'gold_boost', 'looting_boost', 'first_attack_boost'],
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
