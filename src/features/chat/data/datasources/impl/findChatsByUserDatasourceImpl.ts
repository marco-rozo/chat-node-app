import { Failure } from "../../../../../core/errors/failure";
import { BaseMongoDbDatasource } from "../../../../../core/external/database/baseMongodbDatasource";
import { IChat } from "../../../domain/entities/chat";
import { FindChatsByUserDatasource } from "../findChatsByUserDatasource";
import { ChatModel } from "../../../domain/models/chatModels";
import { FindChatsFailure } from "../../../domain/errors/chatFailure";

export class FindChatsByUserDatasourceImpl extends BaseMongoDbDatasource<IChat> implements FindChatsByUserDatasource {
    constructor() {
        super(ChatModel);
    }

    async execute(userId: string): Promise<IChat[] | Failure> {
        try {
            const results = await this.model.find({ participants: userId });
            return results.map(doc => doc.toJSON() as IChat);
        } catch (error: any) {
            console.error("Erro ao buscar chats do usuário:", error);
            return new FindChatsFailure();
        }
    }
}
