import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import { Study } from "./Study";
import { Entry } from "./Entry";
import { User } from "./User";
import { Slide } from "./Slide";
import { Prompt } from "./Prompt";

@Entity()
export class Block {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    mediaURL: string;

    // multiple blocks can be assigned to a Study
    @ManyToOne(type => Study, study => study.blocks)
    study: Study;

    // multiple slides can be within a block
    @OneToMany(type=>Slide, slide => slide.block)
    slides: Slide[];

    // one prompt can be assigned to a block
    @OneToOne(() => Prompt)
    @JoinColumn()
    prompt: Prompt;

    // creates a one-to-many relationship with "Entry"
    // multiple entries can be submitted for each Block
    @OneToMany(type => Entry, entry => entry.block)
    entries: Entry[];
}
