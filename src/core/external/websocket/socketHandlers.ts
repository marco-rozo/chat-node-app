import { Server, Socket } from 'socket.io';
import { sendMessageUsecase } from '../../../features/chat';
import { SocketEventEnum } from './enums/socketEnum';

export class SocketHandlers {
    constructor(private io: Server) { }

    public handleJoinRoom(socket: Socket, data: { room: string }) {
        socket.join(data.room);
    }

    public async handleSendMessage(data: any) {
        await sendMessageUsecase.execute(data);
    }

    public handlePrivateMessage(data: { room: string; [key: string]: any }) {
        this.io.to(data.room).emit(SocketEventEnum.RECEIVE_MESSAGE, data);
    }
}
