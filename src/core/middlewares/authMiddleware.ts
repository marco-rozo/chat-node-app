import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { TokenJwtConfig } from '../const/tokenJwtConfig';
import { TokenPayload } from '../entities/tokenPayload';
import { InvalidTokenFailure, TokenNotProvidedFailure } from '../errors/failures/middlewareFailure';
import { formatErrorResponse } from '../utils/formatResponse';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json(formatErrorResponse(new TokenNotProvidedFailure()));
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
        const data = jwt.verify(token, TokenJwtConfig.SECRET);
        const { id } = data as TokenPayload;

        req.userId = id;

        next();
    } catch {
        return res.status(401).json(formatErrorResponse(new InvalidTokenFailure()));
    }
}
