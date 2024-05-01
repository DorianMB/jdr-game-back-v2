import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('loot_table')
export class LootTable {
  @PrimaryGeneratedColumn()
  loot_table_id: number;

  @Column('enum', {
    enum: [
      'helmet',
      'chestplate',
      'gloves',
      'boots',
      'sword',
      'shield',
      'bow',
      'arrow',
      'magic_wand',
      'magic_book',
      'magic_item',
    ],
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

  @Column('enum', { enum: ['common', 'uncommun', 'rare', 'epic', 'legendary'] })
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

  @Column({ nullable: true })
  price: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
