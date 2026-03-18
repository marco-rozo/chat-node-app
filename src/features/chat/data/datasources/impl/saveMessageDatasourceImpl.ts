import { Failure } from "../../../../../core/errors/failure";
import { BaseMongoDbDatasource } from "../../../../../core/external/database/baseMongodbDatasource";
import { SaveMessageDatasource } from "../saveMessageDatasource";
import { IMessage } from "../../../domain/entities/message";
import { SaveMessageFailure } from "../../../domain/errors/messageFailure";
import { MessageModel } from "../../../domain/models/messageModel";

export class SaveMessageDatasourceImpl extends BaseMongoDbDatasource<IMessage> implements SaveMessageDatasource {
    constructor() {
        super(MessageModel);
    }

    async execute(message: IMessage): Promise<IMessage | Failure> {
        try {
            const result = await this.model.create(message);
            return result.toJSON() as IMessage;
        } catch (error: any) {
            console.error("Erro ao salvar mensagem:", error);
            return new SaveMessageFailure();
        }
    }
}