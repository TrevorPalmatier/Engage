import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, ManyToOne} from "typeorm";
import { Block } from "./Block";
import { SlideMedia } from "./SlideMedia";

@Entity()
export class Slide {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    backgroundText: string;

    // the slide options to choose out of
    @Column({nullable: true})
    option: number;

    // multiple slides can be in a Block
    @ManyToOne(type => Block, block => block.slides, {onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    block: number;

    // creates a one-to-many relationship with 'SlideMedia'
    // multiple media (images, videos) can be within the prompt
    @OneToMany(type =>SlideMedia, slidemedia => slidemedia.slide, {
        cascade: true,
    })
    medias: SlideMedia[];
}
