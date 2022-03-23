import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Slide } from "../entity/Slide";

export class SlideController {
	private slideRepository = getRepository(Slide);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.slideRepository.find({order: {timestamp: "DESC"}});
	}

	async media(request: Request, response: Response, next: NextFunction) {
		if (parseInt(request.params.id, 10) === -1) return [];
		const result = this.slideRepository
			.createQueryBuilder("slide")
			.leftJoinAndSelect("slide.medias", "media")
			.where("slide.id = :id", { id: request.params.id })
			.getOne();
		return (await result).medias;
	}
    async one(request: Request, response: Response, next: NextFunction) {
        return this.slideRepository.findOne(request.params.id, {relations: ["medias"]});
    }

	async save(request: Request, response: Response, next: NextFunction) {
		return this.slideRepository.save(request.body);
	}

    async remove(request: Request, response: Response, next: NextFunction) {
        const slideToRemove = await this.slideRepository.findOne(request.params.id);
        return await this.slideRepository.remove(slideToRemove);
    }

    async update(request: Request, response: Response, next: NextFunction) {
        await this.slideRepository.update(request.params.id, request.body);
		return await this.slideRepository.findOne(request.params.id, {relations: ["medias"]});
    }
}
