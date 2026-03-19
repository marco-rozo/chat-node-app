import { Failure } from "../../../../core/errors/failure";
import { IUser } from "../../domain/entities/user";

export interface FindUserByIdDatasource {
    execute(userId: string): Promise<IUser | Failure>;
}
