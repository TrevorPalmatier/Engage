import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToMany, ManyToOne} from "typeorm";
import { Slide } from "./Slide";

@Entity()
export class SlideMedia {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mediaUrl: string;

    // multiple medias can be used in a slide
    @ManyToOne(type => Slide, slide => slide.medias)
    slide: string;

}
