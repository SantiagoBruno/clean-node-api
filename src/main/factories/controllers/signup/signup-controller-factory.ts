import { SignUpController } from '../../../../presentation/controllers/signup/signup-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAuthentication } from '../../usecases/db-authentication-factorys'
import { makeAddAccount } from '../../usecases/db-add-account-factory'
import { makeLogControllerDecorator } from '../../usecases/log-controller-decorator-factory'

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(
    makeAddAccount(),
    makeSignUpValidation(),
    makeDbAuthentication()
  )
  return makeLogControllerDecorator(signUpController)
}
