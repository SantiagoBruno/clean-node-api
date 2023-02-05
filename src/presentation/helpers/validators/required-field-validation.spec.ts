import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validation'

describe('required field validation', () => {
  test('Should return a MissingParamError id validation fails', () => {
    const sut = new RequiredFieldValidation('any_field')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })
})
