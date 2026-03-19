import { Schema } from 'mongoose';
import { model } from 'mongoose';
import { CollectionsNames } from '../../../../core/const/collectionName';
import { IChat } from '../entities/chat';

const chatSchema = new Schema<IChat>({
    _id: { type: String, required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: CollectionsNames.USERS, required: true }],
    lastMessage: { type: String, ref: CollectionsNames.MESSAGES, required: false }
}, {
    timestamps: true,
    _id: false,
    toJSON: {
        transform: (_, ret: any) => {
            delete ret.__v;
        }
    }
});

export const ChatModel = model<IChat>(CollectionsNames.CHATS, chatSchema);
