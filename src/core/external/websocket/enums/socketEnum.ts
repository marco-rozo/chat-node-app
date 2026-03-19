export enum SocketEventEnum {
  // nomes reservados
  DISCONNECT = "disconnect",
  CONNECTION = "connection",

  // eventos do chat
  JOIN_ROOM = "join_room",
  USER_JOINED = "user_joined",
  SEND_MESSAGE = "send_message",
  RECEIVE_MESSAGE = "receive_message",
  NEW_MESSAGE_NOTIFICATION = "new_message_notification",
  USER_STATUS_CHANGED = "user_status_changed"

}

export enum SocketUserStatusEventEnum {
  ONLINE = "online",
  OFFLINE = "offline",
}
