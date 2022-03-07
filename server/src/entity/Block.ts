import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import { Study } from "./Study";
import { Entry } from "./Entry";
import { User } from "./User";
import { Slide } from "./Slide";

@Entity()
export class Block {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    imageID: string;

    @Column()
    promptTitle: string;

    @Column()
    promptText: string;

    // multiple blocks can be assigned to a Study
    @ManyToOne(type => Study, study => study.blocks, {
        onUpdate: 'CASCADE', onDelete: 'CASCADE', eager: true
    })
    study: Study;

    // multiple slides can be within a block
    @OneToMany(type=>Slide, slide => slide.block, {cascade: true})
    slides: Slide[];

    // creates a one-to-many relationship with "Entry"
    // multiple entries can be submitted for each Block
    @OneToMany(type => Entry, entry => entry.block)
    entries: Entry[];
}
