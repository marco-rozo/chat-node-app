import { Failure } from "../../../../core/errors/failure";
import { IMessage } from "../../domain/entities/message";

export interface SaveMessageDatasource {
    execute(message: IMessage): Promise<IMessage | Failure>;
}