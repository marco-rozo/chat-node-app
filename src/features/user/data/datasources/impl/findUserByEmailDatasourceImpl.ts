import { Failure } from '../../../../../core/errors/failure';
import { UnknownFailure } from '../../../../../core/errors/failures/unknownFailure';
import { BaseMongoDbDatasource } from '../../../../../core/external/database/baseMongodbDatasource';
import { IUser } from '../../../domain/entities/user';
import { UserModel } from '../../../domain/models/userModel';
import { FindUserByEmailDatasource } from '../findUserByEmailDatasource';

export class FindUserByEmailDatasourceImpl extends BaseMongoDbDatasource<IUser> implements FindUserByEmailDatasource {
    constructor() {
        super(UserModel);
    }

    public async execute(email: string, showPassword: boolean = false): Promise<IUser | Failure> {
        try {
            const result = await this.model.findOne({ email }).select(showPassword ? '+password' : '').exec();
            return result ? (result.toJSON() as IUser) : (null as any);
        } catch (error: any) {
            console.error('Erro ao buscar usuário:', error);
            return new UnknownFailure();
        }
    }
}
