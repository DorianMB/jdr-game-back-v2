import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { LootTable } from './LootTable';
import { Bag } from './Bag';
import { CHARM_TYPE_LIST, RARITY_LIST } from '../utils/constants';
import { Character } from './Character';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  item_id: number;

  @ManyToOne(() => LootTable, (loot) => loot.loot_table_id)
  @JoinColumn({ name: 'loot_id' })
  loot_id: Relation<LootTable>;

  @ManyToOne(() => Bag, (bag) => bag.bag_id)
  @JoinColumn({ name: 'bag_id' })
  bag_id: Relation<Bag>;

  @Column({ nullable: true })
  owned: boolean;

  @ManyToOne(() => Character, (character) => character.character_id)
  @JoinColumn({ name: 'in_shop' })
  in_shop: Character;

  @Column()
  level: number;

  @Column({ nullable: true })
  price: number;

  @Column('enum', { enum: RARITY_LIST })
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
