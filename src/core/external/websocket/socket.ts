import { Server, Socket } from "socket.io";
import { SocketEventEnum as SocketEventEnum, SocketUserStatusEventEnum as SocketUserStatusEventEnum } from "./enums/socketEnum";
import { SocketConnection } from "./socketConnection";
import { sendMessageUsecase } from "../../../features/chat";

export class ChatSocket {
    private io: Server;
    private static usersOnline: Map<string, string> = new Map();

    constructor() {
        this.io = SocketConnection.getInstance().getServer();
    }

    public setup() {
        try {
            this.io.on(SocketEventEnum.CONNECTION, (socket: Socket) => {
                this.handleConnection(socket);
            });
            console.info(`✅ Socket conectado com sucesso!`);
        } catch (error) {
            console.error(`❌ Erro ao conectar o socket:`, error);
        }
    }

    public static isUserOnline(userId: string): boolean {
        return this.usersOnline.has(userId);
    }

    public handleConnection(socket: Socket) {
        console.log('Cliente conectado:', socket.id);

        const userId = socket.handshake.auth.userId || socket.handshake.query.userId;

        if (userId) {
            ChatSocket.usersOnline.set(userId, socket.id);
            console.log(`Usuário ${userId} está online.`);

            this.io.emit(SocketEventEnum.USER_STATUS_CHANGED, { userId, status: SocketUserStatusEventEnum.ONLINE });
        }

        socket.on(SocketEventEnum.JOIN_ROOM, (data: any) => this.handleJoinRoom(socket, data));

        socket.on(SocketEventEnum.SEND_MESSAGE, (data: any) => this.handleSendMessage(data));

        socket.on(SocketEventEnum.DISCONNECT, () => {
            console.log('Cliente desconectado:', userId);
            return this.handleDisconnect(socket, userId);
        });
    }

    public handleJoinRoom(socket: Socket, data: any) {
        const { room } = data;
        socket.join(room);
    }

    public async handleSendMessage(data: any) {
        console.log('Mensagem recebida:', data);
        await sendMessageUsecase.execute(data);
    }

    public handleDisconnect(socket: Socket, userId?: string) {
        if (userId) {
            ChatSocket.usersOnline.delete(userId);
            console.log(`Usuário ${userId} ficou offline.`);

            this.io.emit(SocketEventEnum.USER_STATUS_CHANGED, { userId, status: SocketUserStatusEventEnum.OFFLINE });
        }
    }

    public handleSendPrivateMessage(data: any) {
        console.log('Mensagem privada recebida:', data);
        this.io.to(data.room).emit(SocketEventEnum.RECEIVE_MESSAGE, data);
    }
}

export const setupSocket = () => {
    const chatSocket = new ChatSocket();
    chatSocket.setup();
};