import { config } from '@vue/test-utils'
// Vitest 提供的模拟（mocking）工具，用于创建模拟函数、存根和时间控制等功能
import { vi } from 'vitest'
// 导入 ResizeObserver 多边形填充，用于在测试环境中提供 ResizeObserver API 的支持，因为 jsdom 环境可能不原生支持该 API
import ResizeObserver from 'resize-observer-polyfill'

// 使用 vi 的 stubGlobal 方法在全局作用域中创建一个存根（stub），
// 将全局的 ResizeObserver API 替换为导入的 polyfill 版本，这样在测试中使用 ResizeObserver 时就会使用 polyfill 实现
vi.stubGlobal('ResizeObserver', ResizeObserver)
config.global.stubs = {}
