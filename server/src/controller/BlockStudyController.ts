import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Block} from "../entity/Block";
import {Study} from "../entity/Study";

export class BlockStudyController {
    private blockRepository = getRepository(Block);
    private studyRepository = getRepository(Study);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.blockRepository.find({study: request.body.study});
    }
}