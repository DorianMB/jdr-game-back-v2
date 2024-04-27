import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { Item } from './Items';


@Entity('equipment')
export class Equipment {
    @PrimaryGeneratedColumn()
    equipement_id: number;

    @OneToOne(() => Item)
    @JoinColumn({ name: 'helmet_id' })
    helmet: Item;

    @OneToOne(() => Item)
    @JoinColumn({ name: 'chestplate_id' })
    chestplate: Item;

    @OneToOne(() => Item)
    @JoinColumn({ name: 'gloves_id' })
    gloves: Item;

    @OneToOne(() => Item)
    @JoinColumn({ name: 'boots_id' })
    boots: Item;

    @OneToOne(() => Item)
    @JoinColumn({ name: 'sword_id' })
    primary_weapon: Item;

    @OneToOne(() => Item)
    @JoinColumn({ name: 'shield_id' })
    secondary_weapon: Item;

    @OneToOne(() => Item)
    @JoinColumn({ name: 'bow_id' })
    primary_magic_item: Item;

    @OneToOne(() => Item)
    @JoinColumn({ name: 'arrow_id' })
    secondary_magic_item: Item;
}