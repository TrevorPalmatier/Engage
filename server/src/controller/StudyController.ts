import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Study } from "../entity/Study";

export class StudyController {
	private studyRepository = getRepository(Study);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.studyRepository.find({ order: { timestamp: "DESC" } });
	}

	async blocks(request: Request, response: Response, next: NextFunction) {
		const study = this.studyRepository.findOne(request.params.id, { relations: ["blocks"] });
		return (await study).blocks;
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return await this.studyRepository.findOne(request.params.id, { relations: ["blocks", "users"] });
	}

	async save(request: Request, response: Response, next: NextFunction) {
		return this.studyRepository.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const userToRemove = await this.studyRepository.findOne(request.params.id);
		return await this.studyRepository.remove(userToRemove);
	}

	async update(request: Request, response: Response, next: NextFunction) {
		return this.studyRepository.update(request.params.id, request.body);
	}

	async addUser(request: Request, response: Response, next: NextFunction) {
		const accessCode = request.body.code;

		const result = await this.studyRepository
			.createQueryBuilder("study")
			.where("study.code = :code", { code: accessCode })
			.getOne();

		if (result === undefined) return { studyid: null, studyname: null };

		await this.studyRepository
			.createQueryBuilder()
			.relation(Study, "users")
			.of(result)
			.add(request.body.userid)
			.catch((err) => {
				// return { studyid: null, studyname: null };
			});

		return { studyid: result.id, studyname: result.title };
	}
}
