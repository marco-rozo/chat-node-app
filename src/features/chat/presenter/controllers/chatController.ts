import { formatErrorResponse, formatSuccessResponse } from "../../../../core/utils/formatResponse";
import { generateRoomId } from "../../../../core/utils/chatIdUtils";
import { CreateChatDatasource } from "../../data/datasources/createChatDatasource";
import { UpdateChatDatasource } from "../../data/datasources/updateChatDatasource";
import { IChat } from "../../domain/entities/chat";
import { IMessage } from "../../domain/entities/message";
import { FindChatByRoomUsecase } from "../../domain/usecases/findChatByRoomUsecase";
import { Failure } from "../../../../core/errors/failure";
import { SaveMessageDatasource } from "../../data/datasources/saveMessageDatasource";

export class ChatController {
    private createChatDatasource: CreateChatDatasource;
    private updateChatDatasource: UpdateChatDatasource;
    private saveMessageDatasource: SaveMessageDatasource;
    private findChatByRoomUsecase: FindChatByRoomUsecase;

    constructor(createChatUsecase: CreateChatDatasource, updateChatUsecase: UpdateChatDatasource, saveMessageUsecase: SaveMessageDatasource, findChatByRoomUsecase: FindChatByRoomUsecase) {
        this.createChatDatasource = createChatUsecase;
        this.updateChatDatasource = updateChatUsecase;
        this.saveMessageDatasource = saveMessageUsecase;
        this.findChatByRoomUsecase = findChatByRoomUsecase;
    }

    async receiveNewMessage(data: IMessage) {
        try {
            const { sender, receiver, content, chat } = data;

            const message: IMessage = {
                sender: sender,
                receiver: receiver,
                content: content,
                chat: chat!
            };

            const newMessage = await this.saveMessageDatasource.execute(message);
            if (newMessage instanceof Failure) {
                return formatErrorResponse(newMessage);
            }

            let currentChat: IChat;
            let result = await this.findChatByRoomUsecase.execute(chat!);
            if (result instanceof Failure) {
                return formatErrorResponse(result);
            }
            currentChat = result;

            const updateChat = await this.updateChatDatasource.execute({
                ...currentChat,
                lastMessage: content
            });

            if (updateChat instanceof Failure) {
                return formatErrorResponse(updateChat);
            }

            return formatSuccessResponse(newMessage);

        } catch (error: any) {
            console.error(error);
            return formatErrorResponse(error);
        }
    }

    async createChat(request: any, response: any) {
        try {
            const { participants } = request.body;
            console.log("Create chat request received:", participants);

            const roomId = generateRoomId(participants[0], participants[1]);

            const chatData: IChat = {
                _id: roomId,
                participants: participants,
                lastMessage: undefined
            };

            const result = await this.createChatDatasource.execute(chatData);

            if (result instanceof Failure) {
                return response.status(500).json(formatErrorResponse(result));
            }

            return response.status(201).json(formatSuccessResponse(result));
        } catch (error: any) {
            console.error(error);
            return formatErrorResponse(error);
        }
    }
}