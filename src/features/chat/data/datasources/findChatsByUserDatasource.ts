import { Failure } from "../../../../core/errors/failure";
import { IChat } from "../../domain/entities/chat";

export interface FindChatsByUserDatasource {
    execute(userId: string): Promise<IChat[] | Failure>;
}
