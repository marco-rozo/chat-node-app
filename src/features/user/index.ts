import { UserController } from "./presenter/controllers/userController";
import { RegisterUserDatasourceImpl } from "./data/datasources/impl/registerUserDatasourceImpl";
import { RegisterUserUsecaseImpl } from "./domain/usecases/impl/registerUserUsecaseImpl";
import { FindUserByEmailDatasourceImpl } from "./data/datasources/impl/findUserByEmailDatasourceImpl";
import { FindUserByEmailUsecaseImpl } from "./domain/usecases/impl/findUserByEmailUsecaseImpl";
import { CheckUserOnlineUsecaseImpl } from "./domain/usecases/impl/checkUserOnlineUsecaseImpl";

const registerUserDatasource = new RegisterUserDatasourceImpl();
const findUserByEmailDatasource = new FindUserByEmailDatasourceImpl();
const findUserByEmailUsecase = new FindUserByEmailUsecaseImpl(findUserByEmailDatasource);
const registerUserUsecase = new RegisterUserUsecaseImpl(registerUserDatasource, findUserByEmailUsecase);
const checkUserOnlineUsecase = new CheckUserOnlineUsecaseImpl();

const userController = new UserController(registerUserUsecase, findUserByEmailUsecase, checkUserOnlineUsecase);

export { userController, findUserByEmailUsecase, checkUserOnlineUsecase };
