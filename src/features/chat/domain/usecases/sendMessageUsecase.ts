import { IMessage } from "../entities/message";
import { Failure } from "../../../../core/errors/failure";

export interface SendMessageUsecase {
    execute(message: IMessage): Promise<IMessage | Failure>;
}