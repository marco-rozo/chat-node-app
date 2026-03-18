import { Request, Response } from "express";
import { UserAuthFailure } from "../../../auth/domain/errors/userAuthFailure";
import { RegisterUserUsecase } from "../../domain/usecases/registerUserUsecase";
import { UserAlreadyExistsFailure } from "../../domain/errors/userFailure";
import { formatErrorResponse } from "../../../../core/utils/formatResponse";

export class UserController {
    private registerUserUsecase: RegisterUserUsecase;
    constructor(registerUserUsecase: RegisterUserUsecase) {
        this.registerUserUsecase = registerUserUsecase;
    }

    async register(req: Request, res: Response) {
        try {
            const response: any = await this.registerUserUsecase.execute(req.body);
            return res.status(200).json(response);
        } catch (error: any) {
            if (error instanceof UserAlreadyExistsFailure) {
                return res.status(400).json(formatErrorResponse(error));
            }
            console.error(error);
            return res.status(500).json(formatErrorResponse(error));
        }
    }
}