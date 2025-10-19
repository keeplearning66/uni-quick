export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-standard-vue/scss',
    'stylelint-config-recess-order',
  ],
  plugins: ['@stylistic/stylelint-plugin'],
  ignoreFiles: [
    'dist/**',
    'src/uni_modules/**',
    'node_modules/**',
  ],
  rules: {
    '@stylistic/indentation': 2,
    '@stylistic/block-opening-brace-space-before': 'always',
    '@stylistic/block-opening-brace-newline-after': 'always',
    '@stylistic/block-closing-brace-empty-line-before': 'never',
    '@stylistic/max-empty-lines': 1,
    // 禁止空代码
    'no-empty-source': null,
    // 禁止在覆盖高特异性选择器之后出现低特异性选择器
    'no-descending-specificity': null,
    // 不允许未知单位
    'unit-no-unknown': [true, { ignoreUnits: ['rpx', 'mpx'] }],
    // 禁止空注释
    'comment-no-empty': true,
    // @import 规则必须始终使用字符串表示法。
    'import-notation': 'string',
    // 未知的 @ 规则
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'plugin',
          'apply',
          'screen',
          'function',
          'if',
          'each',
          'include',
          'mixin',
          'extend',
          'content',
          'use',
        ],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep'],
      },
    ],
    'selector-type-no-unknown': [true, { ignoreTypes: ['page', 'radio', 'checkbox', 'scroll-view'] }],
    'at-rule-no-deprecated': null,
    'declaration-property-value-no-unknown': null,
    'scss/load-partial-extension': null,
    'selector-class-pattern': [
      '^[a-z0-9-]+(__[a-z0-9-]+)?(--[a-z0-9-]+)?$',
      {
        message: '类名不符合 BEM 规范',
      },
    ],
  },
};
