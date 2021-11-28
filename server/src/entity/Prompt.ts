import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, ManyToOne} from "typeorm";
import { Block } from "./Block";
import { Entry } from "./Entry";
import { PromptMedia } from "./PromptMedia";
import { User } from "./User";

@Entity()
export class Prompt {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    backgroundText: string;

    //multiple prompts can be within a block
    @ManyToOne(type => Block, block => block.prompts)
    block: number;

    // creates a one-to-many relationship with 'PromptMedia'
    //multiple media (images, videos) can be within the prompt
    @OneToMany(type =>PromptMedia, promptmedia => promptmedia.prompt)
    media: PromptMedia[];

    // creates a one-to-many relationship with "Entry"
    // multiple entries can be submitted for each prompt
    @OneToMany(type => Entry, entry => entry.prompt)
    entries: Entry[];

    //multiple users can be assigned to multiple prompts
    @ManyToMany(type => User, user => user.prompts)
    @JoinTable()
    users: User[];
}
