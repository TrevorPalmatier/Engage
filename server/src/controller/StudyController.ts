import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Study } from "../entity/Study";

export class StudyController {
	private studyRepository = getRepository(Study);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.studyRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.studyRepository.findOne(request.params.id);
	}

	async blocks(request: Request, response: Response, next: NextFunction) {
		const study = this.studyRepository
			.createQueryBuilder("study")
			.leftJoinAndSelect("study.blocks", "block")
			.where("study.id = :id", { id: request.params.id })
			.getOne();
		return (await study).blocks;
	}

	async save(request: Request, response: Response, next: NextFunction) {
		return this.studyRepository.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const userToRemove = await this.studyRepository.findOne(request.params.id);
		await this.studyRepository.remove(userToRemove);
	}
}
