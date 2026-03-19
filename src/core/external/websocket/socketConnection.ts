import { Server } from 'socket.io';

export class SocketConnection {

    public static getInstance(): SocketConnection {
        if (!SocketConnection.instance) {
            SocketConnection.instance = new SocketConnection();
        }
        return SocketConnection.instance;
    }
    private static instance: SocketConnection;
    private io: Server | null = null;

    private constructor() { }

    public setServer(io: Server): void {
        this.io = io;
    }

    public getServer(): Server {
        if (!this.io) {
            throw new Error('Socket server not initialized. Call setServer() first.');
        }
        return this.io;
    }

    public isInitialized(): boolean {
        return this.io !== null;
    }
}
