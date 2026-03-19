import { IMessage } from "../../entities/message";
import { GetChatMessagesUsecase } from "../getChatMessagesUsecase";
import { Failure } from "../../../../../core/errors/failure";
import { FindMessagesByChatDatasource } from "../../../data/datasources/findMessagesByChatDatasource";

export class GetChatMessagesUsecaseImpl implements GetChatMessagesUsecase {
    private findMessagesByChatDatasource: FindMessagesByChatDatasource;

    constructor(findMessagesByChatDatasource: FindMessagesByChatDatasource) {
        this.findMessagesByChatDatasource = findMessagesByChatDatasource;
    }

    async execute(chatId: string): Promise<IMessage[] | Failure> {
        const result = await this.findMessagesByChatDatasource.execute(chatId);
        return result;
    }
}
