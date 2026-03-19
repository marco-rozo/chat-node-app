import { SocketEmitter } from "./socketEmitter";
import { SocketConnection } from "./socketConnection";
import { ChatSocket } from "./socket";
import { SocketUserStatusEventEnum } from "./enums/socketEnum";

export class SocketEmitterImpl implements SocketEmitter {
    private socketConnection: SocketConnection;

    constructor() {
        this.socketConnection = SocketConnection.getInstance();
    }

    emitToRoom(room: string, event: string, data: any): void {
        const io = this.socketConnection.getServer();
        io.to(room).emit(event, data);
        console.log(`Evento ${event} emitido para a sala ${room}: `, data);
    }

    emitToAll(event: string, data: any): void {
        const io = this.socketConnection.getServer();
        io.emit(event, data);
        console.log(`Evento ${event} emitido para todos: `, data);
    }

    getUserStatus(userId: string): SocketUserStatusEventEnum {
        return ChatSocket.isUserOnline(userId) ? SocketUserStatusEventEnum.ONLINE : SocketUserStatusEventEnum.OFFLINE;
    }
}
