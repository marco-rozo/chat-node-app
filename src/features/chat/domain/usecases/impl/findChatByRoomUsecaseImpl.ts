import { Failure } from '../../../../../core/errors/failure';
import { FindChatByRoomDatasource } from '../../../data/datasources/findChatByRoomDatasource';
import { IChat } from '../../entities/chat';
import { FindChatByRoomUsecase } from '../findChatByRoomUsecase';

export class FindChatByRoomUsecaseImpl implements FindChatByRoomUsecase {
    private findChatByRoomDatasource: FindChatByRoomDatasource;

    constructor(findChatByRoomDatasource: FindChatByRoomDatasource) {
        this.findChatByRoomDatasource = findChatByRoomDatasource;
    }

    public async execute(room: string): Promise<IChat | Failure> {
        const result = await this.findChatByRoomDatasource.execute(room);
        return result;
    }
}
