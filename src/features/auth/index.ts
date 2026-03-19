import { findUserByEmailUsecase } from '../user';
import { AuthUserUsecase } from './domain/usecases/authUserUsecase';
import { AuthController } from './presenter/controllers/authController';

const authUserUsecase = new AuthUserUsecase(findUserByEmailUsecase);

const authController = new AuthController(authUserUsecase);

export { authController };
