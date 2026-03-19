import { Failure } from '../../../../../core/errors/failure';
import { generateRoomId } from '../../../../../core/utils/chatIdUtils';
import { CreateChatDatasource } from '../../../data/datasources/createChatDatasource';
import { FindChatByRoomDatasource } from '../../../data/datasources/findChatByRoomDatasource';
import { IChat } from '../../entities/chat';
import { CreateChatUsecase } from '../createChatUsecase';

export class CreateChatUsecaseImpl implements CreateChatUsecase {
    private createChatDatasource: CreateChatDatasource;
    private findChatByRoomIdDatasource: FindChatByRoomDatasource;

    constructor(createChatDatasource: CreateChatDatasource, findChatByRoomIdDatasource: FindChatByRoomDatasource) {
        this.createChatDatasource = createChatDatasource;
        this.findChatByRoomIdDatasource = findChatByRoomIdDatasource;
    }

    public async execute(participants: string[]): Promise<IChat | Failure> {
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
        return result;
    }
}
