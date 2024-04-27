import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';

@Entity('loot_table')
export class LootTable {
    @PrimaryGeneratedColumn()
    loot_id: number;

    @Column('enum', { enum: ['helmet', 'chestplate', 'gloves', 'boots', 'sword', 'shield', 'bow', 'arrow', 'magic_wand', 'magic_book', 'magic_item'] })
    type: string;

    @Column({ nullable: true })
    picture: string;

    @Column({ nullable: true })
    fight_picture: string;
    s
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
}