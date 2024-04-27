import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToOne,
} from 'typeorm';
import { Equipment } from './Equipment';
import { User } from './User';
import { Stat } from './Stat';
import { Bag } from './Bag';

@Entity('character')
export class Character {
    @PrimaryGeneratedColumn()
    caracter_id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user_id: User;

    @OneToOne(() => Equipment)
    @JoinColumn({ name: 'equipment_id' })
    equipment: Equipment;

    @OneToOne(() => Stat)
    @JoinColumn({ name: 'stat_id' })
    stat_id: Stat;

    @OneToOne(() => Bag)
    @JoinColumn({ name: 'bag_id' })
    bag_id: Bag;

    @Column({ nullable: true })
    picture: string;

    @Column()
    experience: number;

    @Column()
    money: number;
}