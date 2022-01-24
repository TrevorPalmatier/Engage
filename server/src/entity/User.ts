import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm";
import { Study } from "./Study";
import { Entry } from "./Entry";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	emailAddress: string;

	@Column()
	password: string;

	// a user can sumbit multiple entries
	@OneToMany((type) => Entry, (entry) => entry.user)
	entries: Entry[];

	// multiple users can be part of multiple Studies
	@ManyToMany((type) => Study, study => study.users)
	studies: Study[];
}
