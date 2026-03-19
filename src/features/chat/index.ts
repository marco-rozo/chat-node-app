import { ChatController } from "./presenter/controllers/chatController";
import { CreateChatDatasourceImpl } from "./data/datasources/impl/createChatDatasourceImpl";
import { UpdateChatDatasourceImpl } from "./data/datasources/impl/updateChatDatasourceImpl";
import { FindChatByRoomDatasourceImpl } from "./data/datasources/impl/findChatByRoomDatasourceImpl";
import { SaveMessageDatasourceImpl } from "./data/datasources/impl/saveMessageDatasourceImpl";
import { FindChatsByUserDatasourceImpl } from "./data/datasources/impl/findChatsByUserDatasourceImpl";
import { FindUserByIdDatasourceImpl } from "../user/data/datasources/impl/findUserByIdDatasourceImpl";
import { FindMessagesByChatDatasourceImpl } from "./data/datasources/impl/findMessagesByChatDatasourceImpl";
import { SendMessageUsecaseImpl } from "./domain/usecases/impl/sendMessageUsecaseImpl";
import { FindChatByRoomUsecaseImpl } from "./domain/usecases/impl/findChatByRoomUsecaseImpl";
import { GetUserChatsUsecaseImpl } from "./domain/usecases/impl/getUserChatsUsecaseImpl";
import { GetChatMessagesUsecaseImpl } from "./domain/usecases/impl/getChatMessagesUsecaseImpl";
import { CreateChatUsecaseImpl } from "./domain/usecases/impl/createChatUsecaseImpl";
import { SocketEmitterImpl } from "../../core/external/websocket/socketEmitterImpl";

const createChatDatasource = new CreateChatDatasourceImpl();
const updateChatDatasource = new UpdateChatDatasourceImpl();
const findChatByRoomDatasource = new FindChatByRoomDatasourceImpl();
const saveMessageDatasource = new SaveMessageDatasourceImpl();
const findChatsByUserDatasource = new FindChatsByUserDatasourceImpl();
const findUserByIdDatasource = new FindUserByIdDatasourceImpl();
const findMessagesByChatDatasource = new FindMessagesByChatDatasourceImpl();
const findChatByRoomUsecase = new FindChatByRoomUsecaseImpl(findChatByRoomDatasource);
const socketEmitter = new SocketEmitterImpl();

const sendMessageUsecase = new SendMessageUsecaseImpl(
    saveMessageDatasource,
    findUserByIdDatasource,
    socketEmitter,
    updateChatDatasource,
    findChatByRoomUsecase
);

const createChatUsecase = new CreateChatUsecaseImpl(createChatDatasource, findChatByRoomDatasource);

const getUserChatsUsecase = new GetUserChatsUsecaseImpl(
    findChatsByUserDatasource,
    findUserByIdDatasource
);

const getChatMessagesUsecase = new GetChatMessagesUsecaseImpl(
    findMessagesByChatDatasource
);

const chatController = new ChatController(
    createChatUsecase,
    getUserChatsUsecase,
    getChatMessagesUsecase
);


// Exporto apenas as classes que eu vou utilizar em outros locais ()
export { chatController, sendMessageUsecase };
