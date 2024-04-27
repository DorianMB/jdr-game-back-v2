import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn
} from 'typeorm';
import { LootTable } from './LootTable';
import { Bag } from './Bag';

@Entity('items')
export class Item {
    @PrimaryGeneratedColumn()
    item_id: number;

    @OneToOne(() => LootTable)
    @JoinColumn({ name: 'loot_id' })
    loot_id: LootTable;

    @OneToOne(() => Bag)
    @JoinColumn({ name: 'bag_id' })
    bag_id: Bag;

    @Column()
    level: number;

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

    @Column({ type: 'enum', enum: ['xp_boost', 'gold_boost', 'looting_boost', 'first_attack_boost'], nullable: true })
    charm_type: string;

    @Column({ nullable: true })
    charm_value: number;
}