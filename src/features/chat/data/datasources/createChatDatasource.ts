import { Failure } from "../../../../core/errors/failure";
import { IChat } from "../../domain/entities/chat";

export interface CreateChatDatasource {
    execute(chat: IChat): Promise<IChat | Failure>;
}