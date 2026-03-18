import { Failure } from "../../../../../core/errors/failure";
import { BaseMongoDbDatasource } from "../../../../../core/external/database/baseMongodbDatasource";
import { IUser } from "../../../domain/entities/user";
import { RegisterUserDatasource } from "../registerUserDatasource";
import { UserRegisterFailure } from "../../../domain/errors/userFailure";
import { UserModel } from "../../../domain/models/userModel";

export class RegisterUserDatasourceImpl extends BaseMongoDbDatasource<IUser> implements RegisterUserDatasource {
    constructor() {
        super(UserModel);
    }

    async execute(data: IUser): Promise<IUser | Failure> {
        try {
            const result = await this.model.create(data);
            return result.toJSON() as IUser;
        } catch (error: any) {
            console.error("Erro ao cadastrar usuário:", error);
            return new UserRegisterFailure();
        }
    }
}