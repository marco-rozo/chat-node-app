import { formatErrorResponse, formatSuccessResponse } from "../../../../core/utils/formatResponse";
import { CreateChatUsecase } from "../../domain/usecases/createChatUsecase";
import { GetUserChatsUsecase } from "../../domain/usecases/getUserChatsUsecase";
import { GetChatMessagesUsecase } from "../../domain/usecases/getChatMessagesUsecase";
import { Failure } from "../../../../core/errors/failure";
import { Request, Response } from "express";

export class ChatController {
    private createChatUsecase: CreateChatUsecase;
    private getUserChatsUsecase: GetUserChatsUsecase;
    private getChatMessagesUsecase: GetChatMessagesUsecase;

    constructor(
        createChatUsecase: CreateChatUsecase,
        getUserChatsUsecase: GetUserChatsUsecase,
        getChatMessagesUsecase: GetChatMessagesUsecase,
    ) {
        this.createChatUsecase = createChatUsecase;
        this.getUserChatsUsecase = getUserChatsUsecase;
        this.getChatMessagesUsecase = getChatMessagesUsecase;
    }

    async createChat(request: Request, response: Response) {
        try {
            const { participants } = request.body;
            console.log("Create chat request received:", participants);

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

    async getUserChats(request: Request, response: Response) {
        try {
            const { userId } = request.params;
            console.log("Get user chats request for userId:", userId);

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

    async getChatMessages(request: Request, response: Response) {
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