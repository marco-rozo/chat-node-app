import { Request, Response } from "express";
import { AuthUserUsecase } from "../../domain/usecases/authUserUsecase";
import { UserAuthFailure } from "../../domain/errors/userAuthFailure";
import { IAuthResponse } from "../../domain/entities/authUser";
import { formatErrorResponse, formatSuccessResponse } from "../../../../core/utils/formatResponse";
import { Failure } from "../../../../core/errors/failure";

export class AuthController {
    constructor(private authUserUsecase: AuthUserUsecase) { }

    async login(req: Request, res: Response) {
        try {
            const response: IAuthResponse = await this.authUserUsecase.execute(req.body);

            return res.status(200).json(formatSuccessResponse(response));
        } catch (error: any) {
            if (error instanceof Failure) {
                return res.status(401).json(formatErrorResponse(error));
            }
            console.error(error);
            return res.status(500).json(formatErrorResponse(error));
        }
    }
}