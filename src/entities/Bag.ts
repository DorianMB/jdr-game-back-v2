import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';

@Entity('bag')
export class Bag {
    @PrimaryGeneratedColumn()
    bag_id: number;

    @Column()
    length: number;
}