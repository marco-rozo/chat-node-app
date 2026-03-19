import { Failure } from '../../../../../core/errors/failure';
import { FindMessagesByChatDatasource } from '../../../data/datasources/findMessagesByChatDatasource';
import { IMessage } from '../../entities/message';
import { GetChatMessagesUsecase } from '../getChatMessagesUsecase';

export class GetChatMessagesUsecaseImpl implements GetChatMessagesUsecase {
    private findMessagesByChatDatasource: FindMessagesByChatDatasource;

    constructor(findMessagesByChatDatasource: FindMessagesByChatDatasource) {
        this.findMessagesByChatDatasource = findMessagesByChatDatasource;
    }

    public async execute(chatId: string): Promise<IMessage[] | Failure> {
        const result = await this.findMessagesByChatDatasource.execute(chatId);
        return result;
    }
}
