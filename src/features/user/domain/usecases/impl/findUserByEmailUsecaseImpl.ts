import { DefaultResponse } from "../../../../../core/entities/defaultResponse";
import { Failure } from "../../../../../core/errors/failure";
import { FindUserByEmailDatasource } from "../../../data/datasources/findUserByEmailDatasource";
import { IUser } from "../../entities/user";
import { FindUserByEmailUsecase } from "../findUserByEmailUsecase";

export class FindUserByEmailUsecaseImpl implements FindUserByEmailUsecase {
    private findUserByEmailDatasource: FindUserByEmailDatasource;

    constructor(findUserByEmailDatasource: FindUserByEmailDatasource) {
        this.findUserByEmailDatasource = findUserByEmailDatasource;
    }

    async execute(email: string, showPassword: boolean = false): Promise<Failure | IUser> {
        const result = await this.findUserByEmailDatasource.execute(email, showPassword);

        if (result instanceof Failure) {
            return result;
        }

        return result;
    }
} 