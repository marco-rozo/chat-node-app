import { Failure } from '../../../../core/errors/failure';
import { IMessage } from '../entities/message';

export interface GetChatMessagesUsecase {
    execute(chatId: string): Promise<IMessage[] | Failure>;
}
