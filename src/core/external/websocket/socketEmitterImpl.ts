import { SocketUserStatusEventEnum } from './enums/socketEnum';
import { SocketConnection } from './socketConnection';
import { SocketEmitter } from './socketEmitter';
import { SocketSessionManager } from './socketSessionManager';

export class SocketEmitterImpl implements SocketEmitter {
    private socketConnection: SocketConnection;

    constructor() {
        this.socketConnection = SocketConnection.getInstance();
    }

    public emitToRoom(room: string, event: string, data: any): void {
        const io = this.socketConnection.getServer();
        io.to(room).emit(event, data);
        console.log(`Evento ${event} emitido para a sala ${room}: `, data);
    }

    public emitToAll(event: string, data: any): void {
        const io = this.socketConnection.getServer();
        io.emit(event, data);
        console.log(`Evento ${event} emitido para todos: `, data);
    }

    public getUserStatus(userId: string): SocketUserStatusEventEnum {
        return SocketSessionManager.isUserOnline(userId)
            ? SocketUserStatusEventEnum.ONLINE
            : SocketUserStatusEventEnum.OFFLINE;
    }
}
