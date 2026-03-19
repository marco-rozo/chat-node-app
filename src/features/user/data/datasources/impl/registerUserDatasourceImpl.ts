import { Failure } from '../../../../../core/errors/failure';
import { BaseMongoDbDatasource } from '../../../../../core/external/database/baseMongodbDatasource';
import { IUser } from '../../../domain/entities/user';
import { UserRegisterFailure } from '../../../domain/errors/userFailure';
import { UserModel } from '../../../domain/models/userModel';
import { RegisterUserDatasource } from '../registerUserDatasource';

export class RegisterUserDatasourceImpl extends BaseMongoDbDatasource<IUser> implements RegisterUserDatasource {
    constructor() {
        super(UserModel);
    }

    public async execute(data: IUser): Promise<IUser | Failure> {
        try {
            const result = await this.model.create(data);
            return result.toJSON() as IUser;
        } catch (error: any) {
            console.error('Erro ao cadastrar usuário:', error);
            return new UserRegisterFailure();
        }
    }
}
