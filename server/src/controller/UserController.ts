import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

export class UserController {
	private userRepository = getRepository(User);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.userRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.userRepository.findOne(request.params.id, {relations: ["entries"]});
	}

	async studies(request: Request, response: Response, next: NextFunction) {
		const result = this.userRepository
			.createQueryBuilder("user")
			.leftJoinAndSelect("user.studies", "study")
			.where("user.id = :id", { id: request.params.id })
			.getOne();
		return (await result).studies;
	}

	async save(request: Request, response: Response, next: NextFunction) {
		return this.userRepository.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		const userToRemove = await this.userRepository.findOne(request.params.id);
		await this.userRepository.remove(userToRemove);
	}
}
