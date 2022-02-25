import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Block} from "../entity/Block";
import bodyParser from "body-parser";

export class BlockController {

    private blockRepository = getRepository(Block);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.blockRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.blockRepository.findOne(request.params.id, { relations: ["slides"]});
    }


    async save(request: Request, response: Response, next: NextFunction) {
        return this.blockRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const blockToRemove = await this.blockRepository.findOne(request.params.id);
        await this.blockRepository.remove(blockToRemove);
    }

}