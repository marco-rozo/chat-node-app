import { Failure } from "../../../../core/errors/failure";
import { IChat } from "../../domain/entities/chat";

export interface FindChatByRoomDatasource {
    execute(room: string): Promise<IChat | Failure>;
}