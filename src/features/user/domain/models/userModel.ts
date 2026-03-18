import { Schema, model } from 'mongoose';
import { IUser } from '../entities/user';
import { CollectionsNames } from '../../../../core/const/collectionName';

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
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

export const UserModel = model<IUser>(CollectionsNames.USERS, userSchema);