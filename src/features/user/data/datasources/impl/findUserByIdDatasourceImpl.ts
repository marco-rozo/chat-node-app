import { Model } from 'mongoose';
import { Failure } from '../../../../../core/errors/failure';
import { UnknownFailure } from '../../../../../core/errors/failures/unknownFailure';
import { BaseMongoDbDatasource } from '../../../../../core/external/database/baseMongodbDatasource';
import { IUser } from '../../../domain/entities/user';
import { UserModel } from '../../../domain/models/userModel';
import { FindUserByIdDatasource } from '../findUserByIdDatasource';

export class FindUserByIdDatasourceImpl implements FindUserByIdDatasource {
    private model: Model<IUser>;

    constructor() {
        this.model = UserModel;
    }

    public async execute(userId: string): Promise<IUser | Failure> {
        try {
            const result = await this.model.findById(userId).exec();
            if (!result) {
                return null as any;
            }
            const user = result.toJSON() as IUser;
            return user;
        } catch (error: any) {
            console.error('Erro ao buscar usuário por ID:', error);
            return new UnknownFailure();
        }
    }
}
