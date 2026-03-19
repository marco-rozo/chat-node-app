import { Request, Response } from 'express';
import { Failure } from '../../../../core/errors/failure';
import { formatErrorResponse, formatSuccessResponse } from '../../../../core/utils/formatResponse';
import { CreateChatUsecase } from '../../domain/usecases/createChatUsecase';
import { GetChatMessagesUsecase } from '../../domain/usecases/getChatMessagesUsecase';
import { GetUserChatsUsecase } from '../../domain/usecases/getUserChatsUsecase';

export class ChatController {
    private createChatUsecase: CreateChatUsecase;
    private getUserChatsUsecase: GetUserChatsUsecase;
    private getChatMessagesUsecase: GetChatMessagesUsecase;

    constructor(
        createChatUsecase: CreateChatUsecase,
        getUserChatsUsecase: GetUserChatsUsecase,
        getChatMessagesUsecase: GetChatMessagesUsecase
    ) {
        this.createChatUsecase = createChatUsecase;
        this.getUserChatsUsecase = getUserChatsUsecase;
        this.getChatMessagesUsecase = getChatMessagesUsecase;
    }

    public async createChat(request: Request, response: Response) {
        try {
            const { participants } = request.body;
            const result = await this.createChatUsecase.execute(participants);

            if (result instanceof Failure) {
                return response.status(400).json(formatErrorResponse(result));
            }

            return response.status(201).json(formatSuccessResponse(result));
        } catch (error: any) {
            console.error(error);
            return formatErrorResponse(error);
        }
    }

    public async getUserChats(request: Request, response: Response) {
        try {
            const { userId } = request.params;
            const result = await this.getUserChatsUsecase.execute(userId.toString());

            if (result instanceof Failure) {
                return response.status(500).json(formatErrorResponse(result));
            }

            return response.status(200).json(formatSuccessResponse(result));
        } catch (error: any) {
            console.error(error);
            return formatErrorResponse(error);
        }
    }

    public async getChatMessages(request: Request, response: Response) {
        try {
            const chatIdParam = request.params.chatId;

            const result = await this.getChatMessagesUsecase.execute(chatIdParam.toString()!);

            if (result instanceof Failure) {
                return response.status(500).json(formatErrorResponse(result));
            }

            return response.status(200).json(formatSuccessResponse(result));
        } catch (error: any) {
            console.error(error);
            return formatErrorResponse(error);
        }
    }
}
