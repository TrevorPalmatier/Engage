import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Block} from "../entity/Block";
import {Study} from "../entity/Study";

export class BlockStudyController {
    private blockRepository = getRepository(Block);
    private studyRepository = getRepository(Study);

    async all(request: Request, response: Response, next: NextFunction) {
        const study = await this.studyRepository.findOne(request.params.id);
        return study.blocks;
    }
}