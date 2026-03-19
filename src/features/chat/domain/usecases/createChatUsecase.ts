import { Failure } from '../../../../core/errors/failure';
import { CreateChatUsecaseInput, IChat } from '../entities/chat';

export interface CreateChatUsecase {
    execute(input: CreateChatUsecaseInput): Promise<IChat | Failure>;
}
