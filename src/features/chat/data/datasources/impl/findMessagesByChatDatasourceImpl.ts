import { IMessage } from "../../../domain/entities/message";
import { FindMessagesByChatDatasource } from "../findMessagesByChatDatasource";
import { MessageModel } from "../../../domain/models/messageModel";
import { FindMessagesFailure } from "../../../domain/errors/messageFailure";
import { Model } from "mongoose";

export class FindMessagesByChatDatasourceImpl implements FindMessagesByChatDatasource {
    private model: Model<IMessage>;

    constructor() {
        this.model = MessageModel;
    }

    async execute(chatId: string): Promise<IMessage[] | FindMessagesFailure> {
        try {
            const results = await this.model.find({ chat: chatId }).sort({ _id: 1 }).exec();
            return results.map(doc => doc.toJSON() as IMessage);
        } catch (error: any) {
            console.error("Erro ao buscar mensagens do chat:", error);
            return new FindMessagesFailure();
        }
    }
}
