import { FindUserByEmailDatasourceImpl } from './data/datasources/impl/findUserByEmailDatasourceImpl';
import { RegisterUserDatasourceImpl } from './data/datasources/impl/registerUserDatasourceImpl';
import { CheckUserOnlineUsecaseImpl } from './domain/usecases/impl/checkUserOnlineUsecaseImpl';
import { FindUserByEmailUsecaseImpl } from './domain/usecases/impl/findUserByEmailUsecaseImpl';
import { RegisterUserUsecaseImpl } from './domain/usecases/impl/registerUserUsecaseImpl';
import { UserController } from './presenter/controllers/userController';

const registerUserDatasource = new RegisterUserDatasourceImpl();
const findUserByEmailDatasource = new FindUserByEmailDatasourceImpl();
const findUserByEmailUsecase = new FindUserByEmailUsecaseImpl(findUserByEmailDatasource);
const registerUserUsecase = new RegisterUserUsecaseImpl(registerUserDatasource, findUserByEmailUsecase);
const checkUserOnlineUsecase = new CheckUserOnlineUsecaseImpl();

const userController = new UserController(registerUserUsecase, findUserByEmailUsecase, checkUserOnlineUsecase);

export { userController, findUserByEmailUsecase, checkUserOnlineUsecase };
