
export interface IUser {
    id?: string;
    email: string;
    name: string;
    password?: string;
}

export interface IUserResponse {
    id: string;
    email: string;
    name: string;
}

export function fromUserResponse(user: IUser): IUserResponse {
    let userResponse: IUserResponse = {
        id: user.id!,
        email: user.email,
        name: user.name,
    };

    return userResponse;
}
