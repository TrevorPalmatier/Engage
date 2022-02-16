import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Slide} from "../entity/Slide";

export class SlideController {

    private slideRepository = getRepository(Slide);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.slideRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.slideRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.slideRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const slideToRemove = await this.slideRepository.findOne(request.params.id);
        await this.slideRepository.remove(slideToRemove);
    }

}