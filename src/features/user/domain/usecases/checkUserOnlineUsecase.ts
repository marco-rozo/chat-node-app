export interface CheckUserOnlineUsecase {
    execute(userId: string): boolean;
}