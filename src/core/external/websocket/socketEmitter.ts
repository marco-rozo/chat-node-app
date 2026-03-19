import { SocketUserStatusEventEnum } from "./enums/socketEnum";

export interface SocketEmitter {
    emitToRoom(room: string, event: string, data: any): void;
    emitToAll(event: string, data: any): void;
    getUserStatus(userId: string): SocketUserStatusEventEnum;
}
