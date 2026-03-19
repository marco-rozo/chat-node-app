import { Failure } from '../../../../../core/errors/failure';
import { BaseMongoDbDatasource } from '../../../../../core/external/database/baseMongodbDatasource';
import { IMessage } from '../../../domain/entities/message';
import { SaveMessageFailure } from '../../../domain/errors/messageFailure';
import { MessageModel } from '../../../domain/models/messageModel';
import { SaveMessageDatasource } from '../saveMessageDatasource';

export class SaveMessageDatasourceImpl extends BaseMongoDbDatasource<IMessage> implements SaveMessageDatasource {
    constructor() {
        super(MessageModel);
    }

    public async execute(message: IMessage): Promise<IMessage | Failure> {
        try {
            const result = await this.model.create(message);
            return result.toJSON() as IMessage;
        } catch (error: any) {
            console.error('Erro ao salvar mensagem:', error);
            return new SaveMessageFailure();
        }
    }
}
