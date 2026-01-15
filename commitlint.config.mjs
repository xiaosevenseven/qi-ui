import { readdirSync } from 'node:fs';
import { execSync } from 'child_process';

const getPackages = (packagePath) =>
  readdirSync(packagePath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const scopes = [
  ...getPackages('packages'),
  ...getPackages('internal'),
  'docs',
  'play',
  'project',
  'core',
  'style',
  'ci',
  'dev',
  'deploy',
  'other',
  'typography',
  'color',
  'border',
  'var',
  'ssr',
  'types',
  'deps'
];

// 智能推断默认 scope
const gitStatus = execSync('git status --porcelain || true')
  .toString()
  .trim()
  .split('\n');

const scopeComplete = gitStatus
  .find((r) => ~r.indexOf('M  packages'))
  ?.replace(/\//g, '%%')
  ?.match(/packages%%((\w|-)*)/)?.[1];

const subjectComplete = gitStatus
  .find((r) => ~r.indexOf('M  packages/components'))
  ?.replace(/\//g, '%%')
  ?.match(/packages%%components%%((\w|-)*)/)?.[1];

export default {
  extends: '@commitlint/config-conventional',
  rules: {
    // ===== Scope 相关 =====
    // 允许的 scope 列表（可选）
    'scope-enum': [2, 'always', scopes],
    // scope 必须小写
    'scope-case': [2, 'always', 'lower-case'],

    // ===== Subject 相关 =====
    // subject 大小写不做强制要求（设为警告）
    'subject-case': [
      1,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case']
    ],
    // ubject 不能为空
    'subject-empty': [2, 'never'],
    // subject 不能以 . 结尾
    'subject-full-stop': [2, 'never', '.'],

    // ===== Header 相关 =====
    // header 最长 72 个字符
    'header-max-length': [2, 'always', 72],

    // ===== Body 相关 =====
    // body 前需要空行
    'body-leading-blank': [1, 'always'],

    // ===== Footer 相关 =====
    // footer 前需要空行
    'footer-leading-blank': [1, 'always'],

    // ====== type 相关的=========
    // type 必须小写
    'type-case': [2, 'always', 'lower-case'],
    // type 不能为空
    'type-empty': [2, 'never'],
    // 允许的 type 列表
    'type-enum': [
      2, // 错误级别: 0=禁用, 1=警告, 2=错误
      'always',
      [
        'build', // 构建系统或外部依赖变更
        'chore', // 其他不修改 src 或 test 的变更
        'ci', // CI 配置变更
        'docs', // 文档更新
        'feat', // 新功能
        'fix', // 修复 bug
        'perf', // 性能优化
        'refactor', // 代码重构
        'revert', // 回退
        'test', // 测试相关的
        'style' // 样式优化
      ]
    ]
  },
  // cz-git 交互式提示配置
  prompt: {
    // ===== 消息配置 =====
    messages: {
      type: '选择你要提交的类型:',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围:',
      subject: '填写简短精炼的变更描述:\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行:\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行:\n',
      footerPrefixesSelect: '选择关联 issue 前缀（可选）:',
      customFooterPrefix: '输入自定义 issue 前缀:',
      footer: '列举关联 issue (可选) 例如: #31, #I3244:\n',
      confirmCommit: '是否提交或修改 commit?'
    },
    defaultScope: scopeComplete, // 自动填充 scope
    customScopesAlign: !scopeComplete ? 'top' : 'bottom',
    // 默认 subject
    defaultSubject: subjectComplete && `[${subjectComplete}] `,
    // 是否允许自定义 issue 前缀
    allowCustomIssuePrefixs: false,
    // 是否允许空 issue 前缀
    allowEmptyIssuePrefixs: false
  }
};
