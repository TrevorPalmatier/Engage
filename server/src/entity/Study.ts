import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany, ManyToMany, JoinTable} from "typeorm";
import { User } from "./User";
import { Block } from "./Block";

@Entity()
export class Study {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    code: string;

    @Column({nullable: true})
    imageID: string;

    @Column()
    imgOrientation: string;

    @Column()
    title: string;

    // a study can be assigned multiple blocks
    @OneToMany(type => Block, block => block.study, {
        cascade: true,
    })
    blocks: Block[];

    // multiple users can be assigned to multiple studies
    @ManyToMany(type => User, user => user.studies, {onUpdate: "CASCADE", onDelete: "CASCADE"})
    @JoinTable()
    users: User[];
}
