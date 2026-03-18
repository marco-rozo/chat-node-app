import { Failure } from "../../../../core/errors/failure";
import { IUser } from "../../domain/entities/user";

export interface RegisterUserDatasource {
    execute(data: IUser): Promise<IUser | Failure>;
}