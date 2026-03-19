import { Request, Response } from 'express';
import { Failure } from '../../../../core/errors/failure';
import { formatErrorResponse, formatSuccessResponse } from '../../../../core/utils/formatResponse';
import { IAuthResponse } from '../../domain/entities/authUser';
import { UserAuthFailure } from '../../domain/errors/userAuthFailure';
import { AuthUserUsecase } from '../../domain/usecases/authUserUsecase';

export class AuthController {
    constructor(private authUserUsecase: AuthUserUsecase) { }

    public async login(req: Request, res: Response) {
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
