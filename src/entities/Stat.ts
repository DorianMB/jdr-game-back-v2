import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';

@Entity('stat')
export class Stat {
    @PrimaryGeneratedColumn()
    stat_id: number;

    @Column()
    strength: number;

    @Column()
    intelligence: number;

    @Column()
    speed: number;

    @Column()
    charisma: number;

    @Column()
    health: number;

    @Column()
    luck: number;
}