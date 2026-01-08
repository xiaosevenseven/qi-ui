import { warn, type PropType } from 'vue'
import { fromPairs } from 'lodash-unified'

import { NativePropType, EpPropInput, EpPropMergeType, EpProp } from './types'
import { hasOwn, isObject } from '@vue/shared'

export const epPropKey = '__epPropKey'

export const definePropType = <T>(val: any): PropType<T> => val

export const buildProps = <
  Props extends Record<
    string,
    | { [epPropKey]: true }
    | NativePropType
    | EpPropInput<any, any, any, any, any>
  >,
>(
  props: Props
) =>
  fromPairs(
    Object.entries(props).map(([key, option]) => [
      key,
      buildProp(option as any, key),
    ])
  ) as any

// 判断一个值是否经过 buildProp 处理
export const isEpProp = (val: unknown): val is EpProp<any, any, any> =>
  isObject(val) && !!(val as any)[epPropKey]

//
export const buildProp = <
  Type = never,
  Value = never,
  Validator = never,
  Default extends EpPropMergeType<Type, Value, Validator> = never,
  Required extends boolean = false,
>(
  prop: EpPropInput<Type, Value, Validator, Default, Required>,
  key?: string
) => {
  // 如果传入的不是对象，或已经是处理过的 prop，直接返回
  if (!isObject(prop) || isEpProp(prop)) return prop as any

  const { values, required, default: defaultValue, type, validator } = prop

  const _validator =
    values || validator
      ? (val: unknown) => {
          let valid = false
          let allowedValues: unknown[] = []

          if (values) {
            allowedValues = Array.from(values)
            if (hasOwn(prop, 'default')) {
              allowedValues.push(defaultValue)
            }
            valid ||= allowedValues.includes(val)
          }
          // 检查自定义验证器
          if (validator) valid ||= validator(val)

          // 验证失败的警告
          if (!valid && allowedValues.length > 0) {
            const allowValuesText = [...new Set(allowedValues)]
              .map((value) => JSON.stringify(value))
              .join('.')
            warn(
              `Invalid prop: validation failed${
                key ? ` for prop "${key}"` : ''
              }. Expected one of [${allowValuesText}], got value ${JSON.stringify(
                val
              )}.`
            )
          }
          return valid
        }
      : undefined

  const epProp: any = {
    type,
    required: !!required,
    validator: _validator,
    [epPropKey]: true,
  }
  if (hasOwn(prop, 'default')) epProp.default = defaultValue
  return epProp
}
