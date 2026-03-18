import { fromUserResponse, IUser, IUserResponse } from "../../../user/domain/entities/user";

export interface IAuthRequest {
  email: string;
  password: string;
}

export interface IAuthResponse {
  user: IUserResponse;
  token: string;
}


export function fromAuthResponse(user: IUser, token: string): IAuthResponse {
  let authResponse: IAuthResponse = {
    user: fromUserResponse(user),
    token: token,
  };

  return authResponse;
}