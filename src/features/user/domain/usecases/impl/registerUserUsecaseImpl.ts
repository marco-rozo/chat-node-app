import bcrypt from 'bcryptjs';
import { Failure } from '../../../../../core/errors/failure';
import { RegisterUserDatasource } from '../../../data/datasources/registerUserDatasource';
import { fromUserResponse, IUser } from '../../entities/user';
import { UserEmailAlreadyExistsFailure } from '../../errors/userFailure';
import { FindUserByEmailUsecase } from '../findUserByEmailUsecase';
import { RegisterUserUsecase } from '../registerUserUsecase';

export class RegisterUserUsecaseImpl implements RegisterUserUsecase {
    private registerUserDatasource: RegisterUserDatasource;
    private findUserByEmailUsecase: FindUserByEmailUsecase;

    constructor(registerUserDatasource: RegisterUserDatasource, findUserByEmailUsecase: FindUserByEmailUsecase) {
        this.registerUserDatasource = registerUserDatasource;
        this.findUserByEmailUsecase = findUserByEmailUsecase;
    }

    public async execute(user: IUser): Promise<Failure | IUser> {
        const userExists = await this.findUserByEmailUsecase.execute(user.email);

        if (userExists instanceof Failure) {
            return userExists;
        }

        if (userExists) {
            throw new UserEmailAlreadyExistsFailure();
        }

        const hashPassword: string = await bcrypt.hash(user.password!, 10);

        const userRegister: IUser = {
            ...user,
            password: hashPassword
        };

        const result = await this.registerUserDatasource.execute(userRegister);

        if (result instanceof Failure) {
            return result;
        }

        return fromUserResponse(userRegister);
    }
}
