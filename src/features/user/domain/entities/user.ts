
export interface IUserResponse {
    email: string;
    name: string;
}

export interface IUser extends IUserResponse {
    _id?: string;
    password: string;
}

export function fromUserResponse(user: IUser): IUserResponse {
    let userResponse: IUserResponse = {
        email: user.email,
        name: user.name,
    };

    return userResponse;
}
