import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Block } from "../entity/Block";

export class BlockController {
	private blockRepository = getRepository(Block);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.blockRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.blockRepository.findOne(request.params.id);
	}

	async slides(request: Request, response: Response, next: NextFunction) {
		const promptAndSlides = this.blockRepository
			.createQueryBuilder("block")
			.leftJoinAndSelect("block.prompt", "prompt")
			.leftJoinAndSelect("block.slides", "slide")
			.where("block.id = :id", { id: request.params.id })
			.getOne();
		const prompt = (await promptAndSlides).prompt;
		const result = [
			...(await promptAndSlides).slides,
			{ id: -1, title: prompt.title, backgroundText: prompt.promptText },
		];
		return result;
	}

	async save(request: Request, response: Response, next: NextFunction) {
		const details = request.body;
		const newBlock = await this.blockRepository.create({
			title: details.title,
			prompt: details.prompt,
			mediaURL: details.mediaURL,
		});
		await this.blockRepository.save(newBlock);
		return newBlock;
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const blockToRemove = await this.blockRepository.findOne(request.params.id);
		await this.blockRepository.remove(blockToRemove);
	}
}
