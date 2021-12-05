import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Prompt} from "../entity/Prompt";

export class PromptController {

    private promptRepository = getRepository(Prompt);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.promptRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.promptRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.promptRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const promptToRemove = await this.promptRepository.findOne(request.params.id);
        await this.promptRepository.remove(promptToRemove);
    }

}