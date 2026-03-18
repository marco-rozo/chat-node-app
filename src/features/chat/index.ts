import { ChatController } from "./presenter/controllers/chatController";
import { CreateChatDatasourceImpl } from "./data/datasources/impl/createChatDatasourceImpl";
import { UpdateChatDatasourceImpl } from "./data/datasources/impl/updateChatDatasourceImpl";
import { FindChatByRoomDatasourceImpl } from "./data/datasources/impl/findChatByRoomDatasourceImpl";
import { SaveMessageDatasourceImpl } from "./data/datasources/impl/saveMessageDatasourceImpl";

const createChatDatasource = new CreateChatDatasourceImpl();
const updateChatDatasource = new UpdateChatDatasourceImpl();
const findChatByRoomDatasource = new FindChatByRoomDatasourceImpl();
const saveMessageDatasource = new SaveMessageDatasourceImpl();

const chatController = new ChatController(createChatDatasource, updateChatDatasource, saveMessageDatasource, findChatByRoomDatasource);

export { chatController };
