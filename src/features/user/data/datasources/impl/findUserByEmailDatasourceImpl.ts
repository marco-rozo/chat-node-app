import { Failure } from "../../../../../core/errors/failure";
import { BaseMongoDbDatasource } from "../../../../../core/external/database/baseMongodbDatasource";
import { IUser } from "../../../domain/entities/user";
import { FindUserByEmailDatasource } from "../findUserByEmailDatasource";
import { CollectionsNames } from "../../../../../core/const/collectionName";
import { DatabaseConnection } from "../../../../../core/external/database/databaseConnection";
import { UnknownFailure } from "../../../../../core/errors/failures/unknownFailure";

export class FindUserByEmailDatasourceImpl extends BaseMongoDbDatasource<IUser> implements FindUserByEmailDatasource {
    constructor() {
        super(DatabaseConnection.getInstance().getDatabase(), CollectionsNames.USERS);
    }

    async execute(email: string): Promise<IUser | Failure> {
        try {
            const result = await this.collection.findOne({ email });
            const user: IUser = result as IUser;

            return user;
        } catch (error: any) {
            console.error("Erro ao buscar usuário:", error);
            return new UnknownFailure();
        }
    }
}