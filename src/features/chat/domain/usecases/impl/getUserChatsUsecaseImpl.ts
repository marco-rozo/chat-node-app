import { Failure } from '../../../../../core/errors/failure';
import { FindUserByIdDatasource } from '../../../../user/data/datasources/findUserByIdDatasource';
import { FindChatsByUserDatasource } from '../../../data/datasources/findChatsByUserDatasource';
import { IChat, IChatWithParticipants } from '../../entities/chat';
import { GetUserChatsUsecase } from '../getUserChatsUsecase';

export class GetUserChatsUsecaseImpl implements GetUserChatsUsecase {
    private findChatsByUserDatasource: FindChatsByUserDatasource;
    private findUserByIdDatasource: FindUserByIdDatasource;

    constructor(
        findChatsByUserDatasource: FindChatsByUserDatasource,
        findUserByIdDatasource: FindUserByIdDatasource
    ) {
        this.findChatsByUserDatasource = findChatsByUserDatasource;
        this.findUserByIdDatasource = findUserByIdDatasource;
    }

    public async execute(userId: string): Promise<IChatWithParticipants[] | Failure> {
        const result = await this.findChatsByUserDatasource.execute(userId);

        if (result instanceof Failure) {
            return result;
        }

        const contactUserIds = new Set<string>();

        const chatsWithParticipants: IChatWithParticipants[] = await Promise.all(
            result.map(async (chat: IChat) => {
                const participantsWithDetails = await Promise.all(
                    chat.participants.map(async (participantId: any) => {
                        const participantIdStr = participantId.toString();
                        if (participantIdStr !== userId) {
                            contactUserIds.add(participantIdStr);
                        }
                        const userResult = await this.findUserByIdDatasource.execute(participantIdStr);
                        if (userResult instanceof Failure) {
                            return { id: participantId, name: 'Unknown', email: '' };
                        }
                        return userResult;
                    })
                );

                return {
                    _id: chat._id,
                    participants: participantsWithDetails,
                    lastMessage: chat.lastMessage,
                    createdAt: chat.createdAt,
                    updatedAt: chat.updatedAt
                };
            })
        );

        return chatsWithParticipants;
    }
}
