import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {SlideMedia} from "../entity/SlideMedia";

export class SlideMediaController {

    private slideMediaRepository = getRepository(SlideMedia);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.slideMediaRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.slideMediaRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.slideMediaRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const userToRemove = await this.slideMediaRepository.findOne(request.params.id);
        await this.slideMediaRepository.remove(userToRemove);
    }

    async update(request: Request, response: Response, next: NextFunction) {
        return  this.slideMediaRepository.update(request.params.id, request.body);
    }
}