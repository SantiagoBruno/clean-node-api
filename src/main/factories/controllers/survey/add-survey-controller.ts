import { Controller } from '../../../../presentation/protocols'
import { AddSurveyController } from '../../../../presentation/controllers/survey/add-survey/add-surveu-controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { makeDbAddSurvey } from '../../usecases/survey/db-add-survey-factory'

export const makeAddSurveyController = (): Controller => {
  const addSurveyController = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(addSurveyController)
}
