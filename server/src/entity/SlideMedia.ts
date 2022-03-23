import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToMany, ManyToOne} from "typeorm";
import { Slide } from "./Slide";

@Entity()
export class SlideMedia {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    imageID: string;

    @Column()
    type: string;

    @Column({nullable: false})
    position: number;

    // multiple medias can be used in a slide
    @ManyToOne(type => Slide, slide => slide.medias,  {
        onUpdate: 'CASCADE', onDelete: 'CASCADE', eager: true
    })
    slide: number;

}
