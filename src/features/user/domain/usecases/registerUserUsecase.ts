import { Failure } from "../../../../core/errors/failure";
import { IUser } from "../entities/user";


export interface RegisterUserUsecase {
    execute(user: IUser): Promise<Failure | IUser>;
}
