import { IMessage } from "../../entities/message";
import { SendMessageUsecase } from "../sendMessageUsecase";
import { SaveMessageDatasource } from "../../../data/datasources/saveMessageDatasource";
import { FindUserByIdDatasource } from "../../../../user/data/datasources/findUserByIdDatasource";
import { INewMessageNotification } from "../../entities/messageNotification";
import { UpdateChatDatasource } from "../../../data/datasources/updateChatDatasource";
import { FindChatByRoomUsecase } from "../findChatByRoomUsecase";
import { IChat } from "../../entities/chat";
import { SocketEmitter } from "../../../../../core/external/websocket/socketEmitter";
import { Failure } from "../../../../../core/errors/failure";
import { SocketEventEnum } from "../../../../../core/external/websocket/enums/socketEnum";
import { SendMessageFailure } from "../../errors/messageFailure";

export class SendMessageUsecaseImpl implements SendMessageUsecase {
    private saveMessageDatasource: SaveMessageDatasource;
    private findUserByIdDatasource: FindUserByIdDatasource;
    private socketEmitter: SocketEmitter;
    private updateChatDatasource: UpdateChatDatasource;
    private findChatByRoomUsecase: FindChatByRoomUsecase;

    constructor(
        saveMessageDatasource: SaveMessageDatasource,
        findUserByIdDatasource: FindUserByIdDatasource,
        socketEmitter: SocketEmitter,
        updateChatDatasource: UpdateChatDatasource,
        findChatByRoomUsecase: FindChatByRoomUsecase
    ) {
        this.saveMessageDatasource = saveMessageDatasource;
        this.findUserByIdDatasource = findUserByIdDatasource;
        this.socketEmitter = socketEmitter;
        this.updateChatDatasource = updateChatDatasource;
        this.findChatByRoomUsecase = findChatByRoomUsecase;
    }

    async execute(data: IMessage): Promise<IMessage | Failure> {
        try {
            const message = await this.saveMessageDatasource.execute(data);
            if (message instanceof Failure) {
                return message;
            }

            const chatResult = await this.findChatByRoomUsecase.execute(data.chat);
            if (!(chatResult instanceof Failure)) {
                const chat = chatResult as IChat;
                const chatData: IChat = {
                    _id: chat._id,
                    participants: chat.participants,
                    lastMessage: data.content
                };
                const updatedChat = await this.updateChatDatasource.execute(chatData);
                if (updatedChat instanceof Failure) {
                    console.error("Failed to update chat lastMessage:", updatedChat);
                }
            }

            const senderUser = await this.findUserByIdDatasource.execute(data.sender);
            const senderName = senderUser && 'name' in senderUser ? senderUser.name : "Unknown";

            this.socketEmitter.emitToRoom(data.chat, SocketEventEnum.RECEIVE_MESSAGE, message);

            const notification: INewMessageNotification = {
                chatId: data.chat,
                content: data.content,
                senderName: senderName,
                senderId: data.sender
            };
            this.socketEmitter.emitToRoom(data.chat, SocketEventEnum.NEW_MESSAGE_NOTIFICATION, notification);

            return message;
        } catch (error: any) {
            console.error("Error in SendMessageUsecase:", error);
            return new SendMessageFailure();
        }
    }
}
