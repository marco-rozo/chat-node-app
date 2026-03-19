import { Failure } from '../../../../core/errors/failure';
import { IChatWithParticipants } from '../entities/chat';

export interface GetUserChatsUsecase {
    execute(userId: string): Promise<IChatWithParticipants[] | Failure>;
}
