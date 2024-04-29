import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Item } from './Items';

@Entity('equipment')
export class Equipment {
  @PrimaryGeneratedColumn()
  equipment_id: number;

  @OneToOne(() => Item, (item) => item.item_id)
  @JoinColumn({ name: 'helmet_id' })
  helmet: Relation<Item>;

  @OneToOne(() => Item, (item) => item.item_id)
  @JoinColumn({ name: 'chestplate_id' })
  chestplate: Relation<Item>;

  @OneToOne(() => Item, (item) => item.item_id)
  @JoinColumn({ name: 'gloves_id' })
  gloves: Relation<Item>;

  @OneToOne(() => Item, (item) => item.item_id)
  @JoinColumn({ name: 'boots_id' })
  boots: Relation<Item>;

  @OneToOne(() => Item, (item) => item.item_id)
  @JoinColumn({ name: 'sword_id' })
  primary_weapon: Relation<Item>;

  @OneToOne(() => Item, (item) => item.item_id)
  @JoinColumn({ name: 'shield_id' })
  secondary_weapon: Relation<Item>;

  @OneToOne(() => Item, (item) => item.item_id)
  @JoinColumn({ name: 'bow_id' })
  primary_magic_item: Relation<Item>;

  @OneToOne(() => Item, (item) => item.item_id)
  @JoinColumn({ name: 'arrow_id' })
  secondary_magic_item: Relation<Item>;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
