import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Entry } from "../entity/Entry";

export class EntryController {
	private entryRepository = getRepository(Entry);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.entryRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		const result = this.entryRepository
			.createQueryBuilder("entry")
			.leftJoinAndSelect("entry.user", "user")
			.where("entry.id = :id", { id: request.params.id })
			.getOne();
		return await result;
	}
	async allUser(request: Request, response: Response, next: NextFunction) {
		const result = await this.entryRepository
			.createQueryBuilder("entry")
			.leftJoinAndSelect("entry.block", "block")
			.leftJoinAndSelect("entry.user", "user")
			.where("entry.userId = :id", { id: request.params.id })
			.getMany();
		const blocks = result.map((value) => {
			return value.block;
		});
		return blocks;
	}

	async save(request: Request, response: Response, next: NextFunction) {
		console.log(request.body);
		// return { message: "you are a dumbo" };
		const entry = new Entry();
		const body = request.body;
		entry.user = body.userId;
		entry.block = body.blockId;
		entry.imageID = body.imageID;
		entry.text = body.text;
		return this.entryRepository.save(entry);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const entryToRemove = await this.entryRepository.findOne(request.params.id);
		return await this.entryRepository.remove(entryToRemove);
	}
}
