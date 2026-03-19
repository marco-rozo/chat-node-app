import { fromUserResponse, IUser } from '../../../user/domain/entities/user';

export interface IAuthRequest {
  email: string;
  password: string;
}

export interface IAuthResponse {
  user: IUser;
  token: string;
}

export function fromAuthResponse(user: IUser, token: string): IAuthResponse {
  const authResponse: IAuthResponse = {
    user: fromUserResponse(user),
    token
  };

  return authResponse;
}
