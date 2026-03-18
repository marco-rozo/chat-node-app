import { DefaultResponse } from "../../../../../core/entities/defaultResponse";
import { Failure } from "../../../../../core/errors/failure";
import { RegisterUserDatasource } from "../../../data/datasources/registerUserDatasource";
import { IUser } from "../../entities/user";
import { RegisterUserUsecase } from "../registerUserUsecase";
import { FindUserByEmailUsecase } from "../findUserByEmailUsecase";
import { UserAlreadyExistsFailure } from "../../errors/userFailure";
import bcrypt from "bcryptjs";

export class RegisterUserUsecaseImpl implements RegisterUserUsecase {
    private registerUserDatasource: RegisterUserDatasource;
    private findUserByEmailUsecase: FindUserByEmailUsecase;

    constructor(registerUserDatasource: RegisterUserDatasource, findUserByEmailUsecase: FindUserByEmailUsecase) {
        this.registerUserDatasource = registerUserDatasource;
        this.findUserByEmailUsecase = findUserByEmailUsecase;
    }

    async execute(user: IUser): Promise<Failure | DefaultResponse> {
        const userExists = await this.findUserByEmailUsecase.execute(user.email);

        if (userExists instanceof Failure) {
            return userExists;
        }

        if (userExists) {
            return new UserAlreadyExistsFailure();
        }

        const hashPassword = await bcrypt.hash(user.password, 10);

        const userRegister: IUser = {
            ...user,
            password: hashPassword
        };

        const result = await this.registerUserDatasource.execute(userRegister);

        if (result instanceof Failure) {
            return result;
        }

        const response: DefaultResponse = {
            data: 'Usuário cadastrado com sucesso!'
        }

        return response;

    }
} 