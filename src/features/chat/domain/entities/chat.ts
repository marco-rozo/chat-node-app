import { IUser } from "../../../user/domain/entities/user";

export interface IChat {
    _id: string;
    participants: string[];
    lastMessage?: string;
}