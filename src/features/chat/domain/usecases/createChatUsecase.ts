import { Failure } from '../../../../core/errors/failure';
import { IChat } from '../entities/chat';

export interface CreateChatUsecase {
    execute(participants: string[]): Promise<IChat | Failure>;
}
