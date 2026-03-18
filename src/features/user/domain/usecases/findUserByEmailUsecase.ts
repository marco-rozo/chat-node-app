import { Failure } from "../../../../core/errors/failure";
import { IUser } from "../entities/user";


export interface FindUserByEmailUsecase {
    execute(email: string, showPassword?: boolean): Promise<Failure | IUser>;
}
