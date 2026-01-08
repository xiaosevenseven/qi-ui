<template>
  <i :class="ns.b()" :style="style" v-bind="$attrs">
    <slot />
  </i>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { iconProps } from './icon'
import { useNamespace } from '@qi-ui/hooks'

import type { CSSProperties } from 'vue'
import { addUnit } from '@qi-ui/utils'

defineOptions({
  name: 'QiIcon',
  inheritAttrs: false,
})
const props = defineProps(iconProps)
const ns = useNamespace('icon')

const style = computed<CSSProperties>(() => {
  const { size, color } = props
  const fontSize = addUnit(size)
  if (!fontSize && !color) return {}

  return {
    fontSize,
    '--color': color,
  }
})
</script>

<style scoped></style>
