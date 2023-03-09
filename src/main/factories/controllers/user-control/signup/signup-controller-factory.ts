import { makeDbAuthentication } from '@/main/factories/usecases/user-control/db-authentication-factorys'
import { makeAddAccount } from '@/main/factories/usecases/user-control/db-add-account-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { SignUpController } from '@/presentation/controllers/user-control/signup/signup-controller'
import { Controller } from '@/presentation/protocols'

import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(
    makeAddAccount(),
    makeSignUpValidation(),
    makeDbAuthentication()
  )
  return makeLogControllerDecorator(signUpController)
}
