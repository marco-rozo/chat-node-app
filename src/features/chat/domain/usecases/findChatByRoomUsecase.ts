import { Failure } from "../../../../core/errors/failure";
import { IChat } from "../entities/chat";

export interface FindChatByRoomUsecase {
    execute(room: string): Promise<IChat | Failure>;
}