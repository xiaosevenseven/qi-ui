import type { ExtractPropTypes, PropType } from 'vue'

import { IfNever, UnknownToNever, WritableArray } from './util'
import { epPropKey } from './runtime'

// 定义了 Vue 组件 prop 的 原生类型
type Value<T> = T[keyof T]
export type ExtractPropType<T extends object> = Value<
  ExtractPropTypes<{
    key: T
  }>
>

// 将 Vue 的 Prop 类型定义转为实际的 TS 类型
export type ResolvePropType<T> = IfNever<
  T,
  never,
  ExtractPropType<{
    type: WritableArray<T>
    required: true
  }>
>

export type NativePropType =
  | ((...args: any) => any)
  | { new (...args: any): any }
  | undefined
  | null

export type EpPropMergeType<
  // Vue Prop 的类型定义
  Type,
  // Prop 的具体值约束类型
  Value,
  // 自定义验证器的返回类型
  Validator,
> =
  | IfNever<UnknownToNever<Value>, ResolvePropType<Type>, never>
  | UnknownToNever<Value>
  | UnknownToNever<Validator>

// 确保必须 prop 不会有默认值
export type EpPropInputDefault<
  // 是否必填
  Required extends boolean,
  // prop 的默认值类型
  Default,
> = Required extends true
  ? never
  : // 确保对象和数组类型的默认值使用工厂函数，避免引用共享问题
    Default extends Record<string, unknown> | Array<any>
    ? () => Default
    : (() => Default) | Default

// 对 Vue 原生 Prop 定义的增强和类型安全封装
export type EpPropInput<
  // prop 的类型
  Type,
  // prop 的可选值集合
  Value,
  // 自定义验证器
  Validator,
  // 默认值类型
  Default extends EpPropMergeType<Type, Value, Validator>,
  // 是否必填
  Required extends boolean,
> = {
  type?: Type
  required?: Required
  values?: readonly Value[]
  validator?: ((val: any) => val is Validator) | ((val: any) => boolean)
  default?: EpPropInputDefault<Required, Default>
}

// 用于描述经过 buildProp 处理后的最终 prop 对象的类型结构
export type EpProp<
  // prop 值类型定义
  Type,
  // Default: 默认值类型
  Default,
  // Required: 是否必填（布尔类型）
  Required,
> = {
  readonly type: PropType<Type>
  readonly required: [Required] extends [true] ? true : false
  readonly validator: ((val: unknown) => boolean) | undefined
  // 标记经过 buildProp 处理的 prop
  [epPropKey]: true
  // 如果 Default 是 never，相当于不添加 default 属性
} & IfNever<Default, unknown, { readonly default: Default }>

export {}
