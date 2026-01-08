import { isString, isNumber, isStringNumber } from '../types'
import { debugWarn } from '../error'

const SCOPE = 'utils/dom/style'

export function addUnit(value?: string | number, defaultUnit = 'px') {
  if (!value && value !== 0) return ''

  // @ts-ignore
  if (isNumber(value) || isStringNumber(value)) {
    return `${value}${defaultUnit}`
  } else if (isString(value)) {
    return value
  }
  debugWarn(SCOPE, 'binding value must be a string or number')
}
