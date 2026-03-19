import { Failure } from '../../../../../core/errors/failure';
import { generateRoomId } from '../../../../../core/utils/chatIdUtils';
import { SocketEmitter } from '../../../../../core/external/websocket/socketEmitter';
import { SocketEventEnum } from '../../../../../core/external/websocket/enums/socketEnum';
import { FindUserByIdDatasource } from '../../../../user/data/datasources/findUserByIdDatasource';
import { CreateChatDatasource } from '../../../data/datasources/createChatDatasource';
import { FindChatByRoomDatasource } from '../../../data/datasources/findChatByRoomDatasource';
import { CreateChatUsecaseInput, IChat, IChatWithParticipants } from '../../entities/chat';
import { INewChatNotification } from '../../entities/chatNotification';
import { CreateChatUsecase } from '../createChatUsecase';

export class CreateChatUsecaseImpl implements CreateChatUsecase {
    private createChatDatasource: CreateChatDatasource;
    private findChatByRoomIdDatasource: FindChatByRoomDatasource;
    private findUserByIdDatasource: FindUserByIdDatasource;
    private socketEmitter: SocketEmitter;

    constructor(
        createChatDatasource: CreateChatDatasource,
        findChatByRoomIdDatasource: FindChatByRoomDatasource,
        findUserByIdDatasource: FindUserByIdDatasource,
        socketEmitter: SocketEmitter
    ) {
        this.createChatDatasource = createChatDatasource;
        this.findChatByRoomIdDatasource = findChatByRoomIdDatasource;
        this.findUserByIdDatasource = findUserByIdDatasource;
        this.socketEmitter = socketEmitter;
    }

    public async execute(input: CreateChatUsecaseInput): Promise<IChat | Failure> {
        const { participants, creatorId } = input;
        const roomId = generateRoomId(participants[0], participants[1]);

        const existingChat = await this.findChatByRoomIdDatasource.execute(roomId);
        if (existingChat && !(existingChat instanceof Failure)) {
            return existingChat;
        }

        const chatData: IChat = {
            _id: roomId,
            participants,
            lastMessage: undefined
        };

        const result = await this.createChatDatasource.execute(chatData);

        if (result instanceof Failure) {
            return result;
        }

        const participantsWithDetails = await Promise.all(
            participants.map(async (participantId) => {
                const userResult = await this.findUserByIdDatasource.execute(participantId);
                if (userResult instanceof Failure) {
                    return { id: participantId, name: 'Unknown', email: '' };
                }
                return userResult;
            })
        );

        const chatWithParticipants: IChatWithParticipants = {
            _id: result._id,
            participants: participantsWithDetails,
            lastMessage: result.lastMessage,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
        };

        const notification: INewChatNotification = {
            chat: chatWithParticipants,
            createdBy: creatorId
        };

        const otherParticipantId = participants.find(p => p !== creatorId);
        if (otherParticipantId) {
            this.socketEmitter.emitToRoom(
                otherParticipantId,
                SocketEventEnum.CHAT_CREATED,
                notification
            );
        }

        return result;
    }
}
