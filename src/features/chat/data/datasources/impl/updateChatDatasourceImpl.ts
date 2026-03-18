import { Failure } from "../../../../../core/errors/failure";
import { BaseMongoDbDatasource } from "../../../../../core/external/database/baseMongodbDatasource";
import { IChat } from "../../../domain/entities/chat";
import { UpdateChatDatasource } from "../updateChatDatasource";
import { ChatModel } from "../../../domain/models/chatModels";
import { UpdateChatFailure } from "../../../domain/errors/chatFailure";

export class UpdateChatDatasourceImpl extends BaseMongoDbDatasource<IChat> implements UpdateChatDatasource {
    constructor() {
        super(ChatModel);
    }

    async execute(data: IChat): Promise<IChat | Failure> {
        try {
            const result = await this.model.findByIdAndUpdate(data._id, data, { new: true });
            if (!result) {
                throw new UpdateChatFailure();
            }
            return result.toJSON() as IChat;
        } catch (error: any) {
            console.error("Erro ao atualizar chat:", error);
            return new UpdateChatFailure();
        }
    }
}