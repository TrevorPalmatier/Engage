import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Study } from "../entity/Study";

export class StudyController {
	private studyRepository = getRepository(Study);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.studyRepository.find();
	}

	async blocks(request: Request, response: Response, next: NextFunction) {
		const study = this.studyRepository.findOne(request.params.id, { relations: ["blocks"] });
		return (await study).blocks;
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.studyRepository.findOne(request.params.id, { relations: ["blocks", "users"] });
	}

	async save(request: Request, response: Response, next: NextFunction) {
		return this.studyRepository.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const userToRemove = await this.studyRepository.findOne(request.params.id);
		await this.studyRepository.remove(userToRemove);
	}

	async update(request: Request, response: Response, next: NextFunction) {
		return this.studyRepository.update(request.params.id, request.body);
	}

	async addUser(request: Request, response: Response, next: NextFunction) {
		const accessCode = request.params.code;

		const result = this.studyRepository
			.createQueryBuilder("study")
			.where("study.code = :id" , { id: accessCode })
			.getOne();

		return this.studyRepository.update((await result).id, {users: request.body})
	}

}
