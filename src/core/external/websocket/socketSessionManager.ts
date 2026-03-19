export class SocketSessionManager {

    public static addSession(userId: string, socketId: string): void {
        this.usersOnline.set(userId, socketId);
    }

    public static removeSession(userId: string): void {
        this.usersOnline.delete(userId);
    }

    public static isUserOnline(userId: string): boolean {
        return this.usersOnline.has(userId);
    }

    public static getSocketId(userId: string): string | undefined {
        return this.usersOnline.get(userId);
    }
    private static usersOnline: Map<string, string> = new Map();
}
