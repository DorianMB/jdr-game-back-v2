import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    name: string;

    @Column()
    mail: string;

    @Column()
    password: string;

    @Column('tinyint')
    is_admin: number;
}