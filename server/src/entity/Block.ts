import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany} from "typeorm";
import { Prompt } from "./Prompt";

@Entity()
export class Block {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    imageLink: string;

    @Column()
    title: string;

    // a block can contain multiple prompts
    @OneToMany(type => Prompt, prompt => prompt.block)
    prompts: Prompt[];
}
