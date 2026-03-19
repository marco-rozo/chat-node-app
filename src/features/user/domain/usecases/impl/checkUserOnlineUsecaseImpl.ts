import { SocketSessionManager } from '../../../../../core/external/websocket/socketSessionManager';
import { CheckUserOnlineUsecase } from '../checkUserOnlineUsecase';

export class CheckUserOnlineUsecaseImpl implements CheckUserOnlineUsecase {

    public execute(userId: string): boolean {
        return SocketSessionManager.isUserOnline(userId);
    }
}
