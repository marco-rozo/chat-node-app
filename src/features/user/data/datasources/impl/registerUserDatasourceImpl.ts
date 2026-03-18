import { Failure } from "../../../../../core/errors/failure";
import { BaseMongoDbDatasource } from "../../../../../core/external/database/baseMongodbDatasource";
import { IUser } from "../../../domain/entities/user";
import { RegisterUserDatasource } from "../registerUserDatasource";
import { CollectionsNames } from "../../../../../core/const/collectionName";
import { DatabaseConnection } from "../../../../../core/external/database/databaseConnection";
import { UserRegisterFailure } from "../../../domain/errors/userFailure";

export class RegisterUserDatasourceImpl extends BaseMongoDbDatasource<IUser> implements RegisterUserDatasource {
    constructor() {
        super(DatabaseConnection.getInstance().getDatabase(), CollectionsNames.USERS);
    }

    async execute(data: IUser): Promise<IUser | Failure> {
        try {
            const result = await this.collection.insertOne(data);
            const user: IUser = { ...data, _id: result.insertedId.toString() };

            return user;
        } catch (error: any) {
            console.error("Erro ao cadastrar usuário:", error);
            return new UserRegisterFailure();
        }
    }
}