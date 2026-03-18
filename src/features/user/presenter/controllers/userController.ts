import { Request, Response } from "express";
import { RegisterUserUsecase } from "../../domain/usecases/registerUserUsecase";
import { UserEmailAlreadyExistsFailure } from "../../domain/errors/userFailure";
import { formatErrorResponse, formatSuccessResponse } from "../../../../core/utils/formatResponse";

export class UserController {
    private registerUserUsecase: RegisterUserUsecase;
    constructor(registerUserUsecase: RegisterUserUsecase) {
        this.registerUserUsecase = registerUserUsecase;
    }

    async register(req: Request, res: Response) {
        try {
            const response = await this.registerUserUsecase.execute(req.body);
            return res.status(200).json(formatSuccessResponse(response));
        } catch (error: any) {
            if (error instanceof UserEmailAlreadyExistsFailure) {
                return res.status(400).json(formatErrorResponse(error));
            }
            console.error(error);
            return res.status(500).json(formatErrorResponse(error));
        }
    }
}