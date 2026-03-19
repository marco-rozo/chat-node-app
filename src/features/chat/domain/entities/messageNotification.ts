/**
 * Interface for new message notification
 * Used to notify users about new messages in real-time
 */
export interface INewMessageNotification {
    chatId: string;
    content: string;
    senderName: string;
}
