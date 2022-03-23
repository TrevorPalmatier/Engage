import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Block } from "../entity/Block";
import { Slide } from "../entity/Slide";

export class BlockController {
	private blockRepository = getRepository(Block);
	private slideRepository = getRepository(Slide);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.blockRepository.find({order: {timestamp: "ASC"}});
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
		const slides = this.slideRepository
			.createQueryBuilder("slide")
			.where("slide.blockId= :blockid", {blockid: request.params.id})
			.orderBy('timestamp', "ASC")
			.getMany();
		const blockResult = await this.blockRepository.findOne(request.params.id);
		const result = {
			slides: await slides,
			id: blockResult.id,
			title: blockResult.title,
			promptTitle: blockResult.promptTitle,
			promptText: blockResult.promptText,
			timestamp: blockResult.timestamp,
			imageID: blockResult.imageID,
			study: blockResult.study
		}
		return await result;
	}

	async oneEntries(request: Request, response: Response, next: NextFunction) {
		return this.blockRepository.findOne(request.params.id, { relations: ["entries"] });
	}

	async save(request: Request, response: Response, next: NextFunction) {
		return this.blockRepository.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const blockToRemove = await this.blockRepository.findOne(request.params.id);
		return await this.blockRepository.remove(blockToRemove);
	}
	async update(request: Request, response: Response, next: NextFunction) {
    	await  this.blockRepository.update(request.params.id, request.body);
		return this.blockRepository.findOne(request.params.id, {relations: ["slides"]});
    }
}
