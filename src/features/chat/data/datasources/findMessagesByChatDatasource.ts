import { Failure } from "../../../../core/errors/failure";
import { IMessage } from "../../domain/entities/message";

export interface FindMessagesByChatDatasource {
    execute(chatId: string): Promise<IMessage[] | Failure>;
}
