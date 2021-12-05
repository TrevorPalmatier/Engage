import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Entry} from "../entity/Entry";

export class EntryController {

    private entryRepository = getRepository(Entry);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.entryRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.entryRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.entryRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const entryToRemove = await this.entryRepository.findOne(request.params.id);
        await this.entryRepository.remove(entryToRemove);
    }

}