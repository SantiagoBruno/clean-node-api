import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('any_field', 'any_field_to_compare')
}

describe('Compare fields validation', () => {
  test('Should return a InvalidParamError id validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value',
      any_field_to_compare: 'wrong_value'
    })
    expect(error).toEqual(new InvalidParamError('any_field_to_compare'))
  })
  test('Should return nothing if validation succeds', () => {
    const sut = makeSut()
    const error = sut.validate({ any_field: 'any_value', any_field_to_compare: 'any_value' })
    expect(error).toBeFalsy()
  })
})
