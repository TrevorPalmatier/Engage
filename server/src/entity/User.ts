import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany} from "typeorm";
import { Prompt } from "./Prompt";
import { Entry } from "./Entry";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    emailAddress: string;

    //a user can sumbit multiple entries
    @OneToMany(type => Entry, entry => entry.user)
    entries: Entry[];

    //multiple users can submit multiple entries
    @ManyToMany(type => Prompt, prompt => prompt.users)
    prompts: Prompt[];

}
