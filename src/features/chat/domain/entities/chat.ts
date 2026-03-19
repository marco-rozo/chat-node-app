
import { IUser } from '../../../user/domain/entities/user';

export interface IChat {
    _id: string;
    participants: string[];
    lastMessage?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IChatWithParticipants {
    _id: string;
    participants: IUser[];
    lastMessage?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
