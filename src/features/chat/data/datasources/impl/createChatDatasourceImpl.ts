import { Failure } from '../../../../../core/errors/failure';
import { BaseMongoDbDatasource } from '../../../../../core/external/database/baseMongodbDatasource';
import { IChat } from '../../../domain/entities/chat';
import { CreateChatFailure } from '../../../domain/errors/chatFailure';
import { ChatModel } from '../../../domain/models/chatModels';
import { CreateChatDatasource } from '../createChatDatasource';

export class CreateChatDatasourceImpl extends BaseMongoDbDatasource<IChat> implements CreateChatDatasource {
    constructor() {
        super(ChatModel);
    }

    public async execute(data: IChat): Promise<IChat | Failure> {
        try {
            const result = await this.model.create({
                _id: data._id,
                participants: data.participants,
                lastMessage: data.lastMessage
            });
            return result.toJSON() as IChat;
        } catch (error: any) {
            console.error('Erro ao criar chat:', error);
            return new CreateChatFailure();
        }
    }
}
