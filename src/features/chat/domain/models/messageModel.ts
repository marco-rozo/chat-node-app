import { Schema } from 'mongoose';
import { model } from 'mongoose';
import { CollectionsNames } from '../../../../core/const/collectionName';
import { IMessage } from '../entities/message';

const messageSchema = new Schema<IMessage>({
    chat: { type: String, ref: CollectionsNames.CHATS, required: true },
    sender: { type: String, ref: CollectionsNames.USERS, required: true },
    senderName: { type: String, required: true },
    content: { type: String, required: true }
}, {
    timestamps: true,
    toJSON: {
        transform: (_, ret: any) => {
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.__v;
        }
    }
});

export const MessageModel = model<IMessage>(CollectionsNames.MESSAGES, messageSchema);
