import { Failure } from '../../../../core/errors/failure';
import { IMessage } from '../entities/message';

export interface SendMessageUsecase {
    execute(message: IMessage): Promise<IMessage | Failure>;
}
