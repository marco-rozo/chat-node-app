import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { fromAuthResponse, IAuthRequest, IAuthResponse } from "../entities/authUser";
import { IUser } from "../../../user/domain/entities/user";
import { UserAuthInvalidPasswordFailure, UserAuthNotFoundFailure } from "../errors/userAuthFailure";
import { TokenJwtConfig } from "../../../../core/const/tokenJwtConfig";
import { FindUserByEmailUsecase } from "../../../user/domain/usecases/findUserByEmailUsecase";
import { Failure } from "../../../../core/errors/failure";

export class AuthUserUsecase {
  private findUserByEmailUsecase: FindUserByEmailUsecase;

  constructor(findUserByEmailUsecase: FindUserByEmailUsecase) {
    this.findUserByEmailUsecase = findUserByEmailUsecase;
  }

  async execute({
    email,
    password,
  }: IAuthRequest): Promise<IAuthResponse> {

    const showPassword = true;
    const existUser: IUser | Failure = await this.findUserByEmailUsecase.execute(email, showPassword);

    if (existUser instanceof Failure || existUser === null) {
      throw new UserAuthNotFoundFailure();
    }

    const isValidPassword = await bcrypt.compare(password, existUser.password!);

    if (!isValidPassword) {
      throw new UserAuthInvalidPasswordFailure();
    }

    const token = jwt.sign({ id: existUser.id }, TokenJwtConfig.SECRET, {
      expiresIn: TokenJwtConfig.EXPIRES_IN,
    });

    const response: IAuthResponse = fromAuthResponse(existUser, token);

    return response;
  }
}
