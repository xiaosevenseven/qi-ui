# qi-ui

QI-UI 是一个架构清晰、工程化程度高的企业级组件库：

1. Monorepo 架构：packages 分包管理，职责分离
2. TypeScript 全覆盖：完整类型推导和定义
3. Composition API：逻辑复用通过 Hooks 实现
4. BEM + CSS Variables：可定制的样式系统
5. 完善的工具链：构建、测试、文档一体化

项目目录结构

```text
qi-ui/
├── packages/               # 核心源码包（Monorepo 子包）
│   ├── components/         # 🎯 所有 UI 组件(业务层)
│   ├── hooks/              # 可复用钩子(逻辑层)
│   ├── utils/              # 工具函数(基础层)
│   ├── constants/          # 常量定义(配置层)
│   ├── directives/         # Vue指令(增强层)
│   ├── locale/             # 国际化(i18n层)
│   ├── theme-chalk/        # 样式系统(视觉层)
│   ├── qi-ui/              # 主包(聚合层)
│   └── test-utils/         # 测试工具(质量保障层)
├── internal/               # 内部构建工具链
│   ├── build/              # 构建脚本
│   ├── build-constants/    # 构建常量
│   ├── build-utils/        # 构建辅助工具
│   └── metadata/           # 元数据生成
├── docs/                   # VitePress 文档站点
├── play/                   # 开发调试 Playground
├── scripts/                # 各种脚本（发布、版本管理等）
└── ssr-testing/            # SSR 测试用例
```

Monorepo 的三层架构：

- 第三层（顶层）：聚合包
  - packages/q-ui（聚合所有功能）
- 第二层（中层）：业务包
  - packages/components（组件库）← 依赖中间层
- 第一点五层（中间层）：可复用逻辑
  - packages/directives（指令）
  - packages/hooks（组合式函数）
  - packages/utils（工具函数）
- 第一层（底层）：基础设施
  - packages/constants（常量）
  - packages/locale（国际化）
  - packages/test-utils（测试工具）
  - packages/theme-chalk（样式）

设计原理

- 分层解耦: 每个包职责单一,降低耦合度
- 按需加载: 用户可以单独引用某个组件或工具
- workspace 引用: 包之间通过 workspace:\* 互相依赖

## 前端工程化

- 代码规范体系
- 提交规范体系
- 构建工程体系
- 测试质量体系
- CI/CD自动化
- 依赖管理体系
- 文档工程化
- 发布流程自动化
- 监控与反馈

### 提交规范体系

```text
Step 1: 安装核心依赖
    ↓
Step 2: 初始化 Husky (Git Hooks 管理)
    ↓
Step 3: 配置 lint-staged (代码预检查)
    ↓
Step 4: 配置 Commitlint (提交信息校验)
    ↓
Step 5: 配置 cz-git (交互式提交工具)
    ↓
Step 6: 添加 npm scripts
    ↓
完成！
```

Step1: 安装核心依赖

```bash
pnpm add -Dw husky lint-staged @commitlint/cli @commitlint/config-conventional cz-git czg
```

| 依赖                            | 作用                                             |
| ------------------------------- | ------------------------------------------------ |
| husky                           | Git Hooks 管理工具，在特定 git 操作时触发脚本    |
| lint-staged                     | 代码预检查工具，在提交前检查 git 暂存区的代码    |
| @commitlint/cli                 | 提交信息校验工具，用于检查提交信息是否符合规范   |
| @commitlint/config-conventional | 提交信息校验配置，遵循 conventional 提交信息规范 |
| cz-git                          | 交互式提交工具，提供命令行界面供用户选择提交信息 |
| czg                             | cz-git 的独立 CLI 工具                           |

Step 2: 初始化 Husky

```bash
npx husky init
```

创建 pre-commit 钩子，用于在提交代码前执行 lint-staged

```bash
# 创建 pre-commit 钩子文件
echo "pnpm exec lint-staged" > .husky/pre-commit
```

创建 commit-msg 钩子

```bash
# 创建 commit-msg 钩子文件
echo 'pnpm exec commitlint --config commitlint.config.mjs --edit "${1}"' > .husky/commit-msg
```

Step 3: 配置 lint-staged

在 package.json 中添加配置：

```json
{
  "lint-staged": {
    "*.{js,ts,jsx,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

Step 4: 配置 Commitlint

创建 commitlint.config.mjs（推荐使用 ESM 格式）

```js

```

规则格式为：'规则名': [级别, '适用条件', 值]

错误级别：

0 - 禁用规则
1 - 警告（不阻止提交）
2 - 错误（阻止提交）

适用条件：

'always' - 必须满足
'never' - 必须不满足

Step 5: 配置 cz-git

Step 6: 配置 package.json

```json
{
  "scripts": {
    "cz": "czg",
    "commit": "czg",
    "lint:commit": "commitlint --edit",
    "prepare": "husky"
  }
}
```
