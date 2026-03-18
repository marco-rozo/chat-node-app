import { Failure } from "../../../../core/errors/failure";
import { IUser } from "../../domain/entities/user";

export interface FindUserByEmailDatasource {
    execute(email: string, showPassword?: boolean): Promise<IUser | Failure>;
}