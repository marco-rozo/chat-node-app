import { Server, Socket } from "socket.io";
import { SocketEventEnum as SocketEventEnum, SocketUserStatusEventEnum as SocketUserStatusEventEnum } from "./enums/socketEnum";
import { SocketConnection } from "./socketConnection";
import { SocketSessionManager } from "./socketSessionManager";
import { SocketHandlers } from "./socketHandlers";

class ChatSocket {
    private io: Server;
    private handlers: SocketHandlers;

    constructor() {
        this.io = SocketConnection.getInstance().getServer();
        this.handlers = new SocketHandlers(this.io);
    }

    public setup() {
        try {
            this.io.on(SocketEventEnum.CONNECTION, (socket: Socket) => this.onConnection(socket));
            console.info(`✅ Socket conectado com sucesso!`);
        } catch (error) {
            console.error(`❌ Erro ao conectar o socket:`, error);
        }
    }

    private onConnection(socket: Socket): void {
        const userId = socket.handshake.auth.userId || socket.handshake.query.userId;

        if (userId) {
            this.handleUserOnline(userId, socket.id);
        }

        socket.on(SocketEventEnum.JOIN_ROOM, (data) => this.handlers.handleJoinRoom(socket, data));
        socket.on(SocketEventEnum.SEND_MESSAGE, (data) => this.handlers.handleSendMessage(data));
        socket.on(SocketEventEnum.DISCONNECT, () => this.handleUserOffline(userId));
    }

    private handleUserOnline(userId: string, socketId: string): void {
        SocketSessionManager.addSession(userId, socketId);
        this.io.emit(SocketEventEnum.USER_STATUS_CHANGED, {
            userId,
            status: SocketUserStatusEventEnum.ONLINE
        });
        console.log(`Usuário ${userId} está online.`);
    }

    private handleUserOffline(userId?: string): void {
        if (userId) {
            SocketSessionManager.removeSession(userId);
            this.io.emit(SocketEventEnum.USER_STATUS_CHANGED, {
                userId,
                status: SocketUserStatusEventEnum.OFFLINE
            });
            console.log(`Usuário ${userId} ficou offline.`);
        }
    }
}

export const setupSocket = () => {
    const chatSocket = new ChatSocket();
    chatSocket.setup();
};