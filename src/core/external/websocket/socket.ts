import { Server, Socket } from "socket.io";
import { SocketEvent } from "./enums/socketEventEnum";

export class ChatSocket {
    private io: Server;

    constructor(io: Server) {
        this.io = io;
    }

    public setup() {
        this.io.on(SocketEvent.CONNECTION, (socket: Socket) => {
            this.handleConnection(socket);
        });
    }

    public handleConnection(socket: Socket) {
        console.log('Cliente conectado:', socket.id);

        // Entrar em uma "sala" específica 
        socket.on(SocketEvent.JOIN_ROOM, (data: any) => this.handleJoinRoom(socket, data));

        // Enviar mensagem
        socket.on(SocketEvent.SEND_MESSAGE, (data: any) => this.handleSendMessage(data));

        // Evento customizado de desconexão do chat
        socket.on(SocketEvent.CHAT_DISCONNECT, (data: any) => this.handleChatDisconnect(socket, data));

        socket.on(SocketEvent.DISCONNECT, () => this.handleDisconnect(socket));
    }

    public handleJoinRoom(socket: Socket, data: any) {
        const { room, user } = data;
        socket.join(room);
        console.log(`User ${user} entrou na sala: ${room}`);

        // Avisa aos outros da sala que esse usuário entrou
        socket.to(room).emit(SocketEvent.USER_JOINED, data);
    }

    public handleSendMessage(data: any) {
        console.log('Mensagem recebida:', data);
        // Envia para todos na sala, incluindo quem enviou
        this.io.to(data.room).emit(SocketEvent.RECEIVE_MESSAGE, data);
    }

    public handleChatDisconnect(socket: Socket, data: any) {
        console.log(`Usuário ${data.user} desconectou da sala ${data.room}`);
        // Avisar os outros usuários da sala que alguém saiu
        socket.to(data.room).emit(SocketEvent.USER_LEFT, data);
    }

    public handleDisconnect(socket: Socket) {
        console.log("Usuário desconectado", socket.id);
    }
}

export const setupSocket = (io: Server) => {
    const chatSocket = new ChatSocket(io);
    chatSocket.setup();
};