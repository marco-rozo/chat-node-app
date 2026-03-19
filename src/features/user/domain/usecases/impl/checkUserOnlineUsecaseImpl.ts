import { ChatSocket } from "../../../../../core/external/websocket/socket";
import { CheckUserOnlineUsecase } from "../checkUserOnlineUsecase";

export class CheckUserOnlineUsecaseImpl implements CheckUserOnlineUsecase {

    execute(userId: string): boolean {
        return ChatSocket.isUserOnline(userId);
    }
}
