import { Request, Response } from "express";
import { RegisterUserUsecase } from "../../domain/usecases/registerUserUsecase";
import { UserEmailAlreadyExistsFailure, UserNotFoundFailure } from "../../domain/errors/userFailure";
import { formatErrorResponse, formatSuccessResponse } from "../../../../core/utils/formatResponse";
import { FindUserByEmailUsecase } from "../../domain/usecases/findUserByEmailUsecase";
import { CheckUserOnlineUsecase } from "../../domain/usecases/checkUserOnlineUsecase";
import { Failure } from "../../../../core/errors/failure";

export class UserController {
    private registerUserUsecase: RegisterUserUsecase;
    private findUserByEmailUsecase: FindUserByEmailUsecase;
    private checkUserOnlineUsecase: CheckUserOnlineUsecase;

    constructor(
        registerUserUsecase: RegisterUserUsecase,
        findUserByEmailUsecase: FindUserByEmailUsecase,
        checkUserOnlineUsecase: CheckUserOnlineUsecase
    ) {
        this.registerUserUsecase = registerUserUsecase;
        this.findUserByEmailUsecase = findUserByEmailUsecase;
        this.checkUserOnlineUsecase = checkUserOnlineUsecase;
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

    async findUserByEmail(req: Request, res: Response) {
        try {
            const email = Array.isArray(req.params.email) ? req.params.email[0] : req.params.email;
            const response = await this.findUserByEmailUsecase.execute(email);

            if (response instanceof Failure || !response) {
                return res.status(400).json(formatErrorResponse(new UserNotFoundFailure()));
            }

            return res.status(200).json(formatSuccessResponse(response));
        } catch (error: any) {
            console.error(error);
            return res.status(500).json(formatErrorResponse(error));
        }
    }

    async checkUserOnline(req: Request, res: Response) {
        try {
            const userId = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId;
            const isOnline = this.checkUserOnlineUsecase.execute(userId);

            return res.status(200).json(formatSuccessResponse({ userId, isOnline }));
        } catch (error: any) {
            console.error(error);
            return res.status(500).json(formatErrorResponse(error));
        }
    }
}