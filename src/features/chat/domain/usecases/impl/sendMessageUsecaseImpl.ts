import { IMessage } from "../../entities/message";
import { SendMessageUsecase } from "../sendMessageUsecase";

export class SendMessageUsecaseImpl implements SendMessageUsecase {
    async execute(data: any): Promise<IMessage> {
        console.log(data);

        return {} as IMessage;
    }
}