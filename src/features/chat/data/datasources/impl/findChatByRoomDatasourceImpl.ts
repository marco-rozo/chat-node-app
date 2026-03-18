import { Failure } from "../../../../../core/errors/failure";
import { BaseMongoDbDatasource } from "../../../../../core/external/database/baseMongodbDatasource";
import { IChat } from "../../../domain/entities/chat";
import { FindChatByRoomDatasource } from "../findChatByRoomDatasource";
import { ChatModel } from "../../../domain/models/chatModels";
import { ChatNotFoundFailure } from "../../../domain/errors/chatFailure";

export class FindChatByRoomDatasourceImpl extends BaseMongoDbDatasource<IChat> implements FindChatByRoomDatasource {
    constructor() {
        super(ChatModel);
    }

    async execute(room: string): Promise<IChat | Failure> {
        try {
            const result = await this.model.findOne({ _id: room });
            if (!result) {
                throw new ChatNotFoundFailure();
            }
            return result.toJSON() as IChat;
        } catch (error: any) {
            console.error("Erro ao buscar chat:", error);
            return new ChatNotFoundFailure();
        }
    }
}