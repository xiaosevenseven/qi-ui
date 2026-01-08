import { buildProps, definePropType } from '@qi-ui/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'
import type Icon from './icon.vue'

export const iconProps = buildProps({
  // svg 图标的大小 size * size
  size: {
    type: definePropType<number | string>([String, Number]),
  },
  // svg 的填充色
  color: {
    type: String,
  },
} as const)

// 内部使用的完整 props 类型：包含所有 prop 的详细定义（包括默认值、验证器等）
export type IconProps = ExtractPropTypes<typeof iconProps>

// 对外暴露的公共 props 类型： 只包含用户需要关心的类型信息，隐藏内部实现细节
export type IconPropsPublic = ExtractPublicPropTypes<typeof iconProps>

// 组件实例的类型：用于 ref 或 getCurrentInstance() 时的类型标注
export type IconInstance = InstanceType<typeof Icon> & unknown
