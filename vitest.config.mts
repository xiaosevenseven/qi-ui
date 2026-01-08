import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  // 用于处理 Vue 文件和 JSX 语法
  plugins: [Vue(), VueJsx()],
  // 配置依赖项选项
  optimizeDeps: {
    // 禁用依赖预构建功能
    disabled: true,
  },
  test: {
    // 设置测试套件名称为 unit
    name: 'unit',
    // 每次测试运行前清除模拟函数的调用历史和状态
    clearMocks: true,
    // 设置测试环境为 jsdom，提供浏览器 DOM API 的虚拟环境，适合前端组件测试
    environment: 'jsdom',
    // 配置测试文件路径
    setupFiles: ['./vitest.setup.ts'],
    // 配置测试报告
    reporters: ['default'],
    // 代码覆盖率相关的配置
    coverage: {
      // 代码覆盖率报告的输出格式，包括文本格式、JSON摘要和完整JSON格式
      reporter: ['text', 'json-summary', 'json'],
      // 代码覆盖率统计中排除的文件路径模式列表
      exclude: ['play/**', '**/lang/**', 'packages/components/*/style/**'],
    },
  },
})
