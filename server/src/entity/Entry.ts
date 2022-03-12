import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne} from "typeorm";
import { Block } from "./Block";
import { User } from "./User";

@Entity()
export class Entry {

    @PrimaryGeneratedColumn()
    id: number;

    // multiple entries can be submitted to a single prompt
    @ManyToOne(type => Block, block => block.entries, {onUpdate: "CASCADE", onDelete: "CASCADE"})
    block: number;

    // multiple entries can be submitted by a user
    @ManyToOne(type => User, user => user.entries, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    user: number;

    @Column()
    imageID: string;

    @Column({nullable: true})
    text: string;

}
