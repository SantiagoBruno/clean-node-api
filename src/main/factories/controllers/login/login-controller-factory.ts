import { Controller } from '../../../../presentation/protocols'
import { LoginController } from '../../../../presentation/controllers/login/login-controller'
import { makeLoginValidation } from './login-validation-factory'
import { makeDbAuthentication } from '../../usecases/db-authentication-factorys'
import { makeLogControllerDecorator } from '../../usecases/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  const loginController = new LoginController(makeDbAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(loginController)
}
