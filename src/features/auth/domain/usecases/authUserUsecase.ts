import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TokenJwtConfig } from '../../../../core/const/tokenJwtConfig';
import { Failure } from '../../../../core/errors/failure';
import { IUser } from '../../../user/domain/entities/user';
import { FindUserByEmailUsecase } from '../../../user/domain/usecases/findUserByEmailUsecase';
import { fromAuthResponse, IAuthRequest, IAuthResponse } from '../entities/authUser';
import { UserAuthInvalidPasswordFailure, UserAuthNotFoundFailure } from '../errors/userAuthFailure';

export class AuthUserUsecase {
  private findUserByEmailUsecase: FindUserByEmailUsecase;

  constructor(findUserByEmailUsecase: FindUserByEmailUsecase) {
    this.findUserByEmailUsecase = findUserByEmailUsecase;
  }

  public async execute({
    email,
    password
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
      expiresIn: TokenJwtConfig.EXPIRES_IN
    });

    const response: IAuthResponse = fromAuthResponse(existUser, token);

    return response;
  }
}
