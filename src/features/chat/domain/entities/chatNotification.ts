import { IChatWithParticipants } from "./chat";

export interface INewChatNotification {
    chat: IChatWithParticipants;
    createdBy: string;
}
