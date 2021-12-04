import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToMany, ManyToOne} from "typeorm";
import { Prompt } from "./Prompt";

@Entity()
export class PromptMedia {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mediaUrl: string;

    // multiple medias can be used in a prompt
    @ManyToOne(type => Prompt, prompt => prompt.media)
    prompt: string;

}
