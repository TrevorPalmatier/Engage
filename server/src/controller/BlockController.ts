import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Block } from "../entity/Block";

export class BlockController {
	private blockRepository = getRepository(Block);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.blockRepository.find();
	}

	async slides(request: Request, response: Response, next: NextFunction) {
		const promptAndSlides = this.blockRepository.findOne(request.params.id, { relations: ["slides"] });
		const result = [
			...(await promptAndSlides).slides,
			{ id: -1, title: (await promptAndSlides).promptTitle, backgroundText: (await promptAndSlides).promptText },
		];
		return result;
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.blockRepository.findOne(request.params.id, { relations: ["slides"] });
	}

	async oneEntries(request: Request, response: Response, next: NextFunction) {
		return this.blockRepository.findOne(request.params.id, { relations: ["entries"] });
	}

	async save(request: Request, response: Response, next: NextFunction) {
		return this.blockRepository.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const blockToRemove = await this.blockRepository.findOne(request.params.id);
		await this.blockRepository.remove(blockToRemove);
	}
	async update(request: Request, response: Response, next: NextFunction) {
    	await  this.blockRepository.update(request.params.id, request.body);
		return this.blockRepository.findOne(request.params.id, {relations: ["slides"]});
    }
}
