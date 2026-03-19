import { CheckUserOnlineUsecase } from "../checkUserOnlineUsecase";
import { SocketSessionManager } from "../../../../../core/external/websocket/socketSessionManager";

export class CheckUserOnlineUsecaseImpl implements CheckUserOnlineUsecase {

    execute(userId: string): boolean {
        return SocketSessionManager.isUserOnline(userId);
    }
}
