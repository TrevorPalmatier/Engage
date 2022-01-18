import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, ManyToOne, OneToOne} from "typeorm";

@Entity()
export class Prompt {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    promptText: string;
}
