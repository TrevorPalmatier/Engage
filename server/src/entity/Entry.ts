import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne} from "typeorm";
import { Prompt } from "./Prompt";
import { User } from "./User";

@Entity()
export class Entry {

    @PrimaryGeneratedColumn()
    id: number;

    //multiple entries can be submitted to a single prompt
    @ManyToOne(type => Prompt, prompt => prompt.entries)
    prompt: number;

    //multiple entries can be submitted by a user
    @ManyToOne(type => User, user => user.entries)
    user: number;

    @Column()
    imageLink: string;

    @Column({nullable: true})
    text: string;

}
