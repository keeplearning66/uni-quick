# uniapp 轻量开发模板(Vue 3)

### 特性

- [x] 集成 `wot-design-uni` 组件库
- [x] 支持单位自动转换：`.env` 文件中设置 `VITE_ENABLE_UNIT_CONVERSION` (是否开启转换，默认为 `true` )和 `VITE_UI_SIZE` (设计稿尺寸，默认为 `375` )，使用 `UnoCSS` 和 `<style></style>` 设置元素尺寸大小时可直接用设计稿中的 `px` 尺寸，编译后会自动转换为 `rpx` 尺寸(注意：内联样式和 `JS` 中的样式暂时不支持转换)；如果有部分情况不想进行转换，可以使用 `mpx` (在 `postcssUnitProcessor` 中自定义不需要转换的单位)；`UnoCSS` 扩展建议用 `0.61.6` 版本，配置单位转换后只有低版本才支持智能提示
- [x] 支持多环境打包构建
- [x] 使用 `pinia` 状态管理
- [x] 集成 `Alova.js` 请求工具集
- [x] 支持自动加载组件和 `API`
- [x] 自动校验 `git` 提交代码格式，格式如下：`feat: 新增功能` 提交类型可参考 `cz.config.js`
- [x] 集成 `ESLint`、`StyleLint`、`EditorConfig` 代码格式规范
- [x] `Typescript` 支持
- [x] 集成 `UnoCSS`
- [x] 集成 `@iconify-json/mdi` 图标库，搭配 `UnoCSS` 使用
- [x] 集成 `z-paging` 组件
- [x] 添加页面跳转拦截，登录权限校验
- [x] 项目分包
- [x] 集成 `rollup-plugin-visualizer` 包体积视图分析插件
- [x] 集成 `vue-i18n` 国际化插件

### 目录结构
```
uni-quick
├ build                 vite 配置统一管理
│  ├ config
│  └ plugins
├ env                   环境变量
├ scripts               脚本
│  ├ post-upgrade.js    依赖库清理
│  └ verify-commit.js   git 提交检验
├ src
│  ├ api                接口管理
│  ├ components         公共组件
│  ├ hooks              常用 hooks 封装
│  ├ locale             国际化语言管理
│  ├ pages              页面管理
│  ├ plugins            插件管理
│  ├ router             路由管理
│  ├ static             静态资源
│  ├ store              状态管理
│  ├ utils              工具函数
│  ├ App.vue
│  ├ main.ts
│  ├ manifest.json      项目配置
│  ├ pages.json         页面配置
│  └ uni.scss           全局 scss 变量
├ types                 全局 typescript 类型文件
│  ├ auto-imports.d.ts
│  ├ components.d.ts
│  ├ global.d.ts
│  └ module.d.ts
├ LICENSE
├ README.md
├ cz.config.js          cz-git 配置
├ eslint.config.js      eslint 配置
├ index.html
├ package.json
├ pnpm-lock.yaml
├ stylelint.config.js   stylelint 配置
├ tsconfig.json
├ uno.config.ts         unocss 配置
└ vite.config.ts        vite 配置
```

### 使用方法

```bash
# 安装依赖
pnpm install

# 启动H5
pnpm dev:h5

# 启动微信小程序
pnpm dev:mp-weixin
```

### 发布

```bash
# 构建开发环境
pnpm build:h5
pnpm build:mp-weixin

# 构建测试环境
pnpm build:h5-test
pnpm build:mp-weixin-test

# 构建生产环境
pnpm build:h5-prod
pnpm build:mp-weixin-prod
```

### 代码提交
```bash
pnpm cz
```

### 更新uniapp版本

更新uniapp相关依赖到最新正式版
```bash
npx @dcloudio/uvm@latest
```
或者执行下面的命令
```bash
pnpm uvm
```

在升级完后，会自动添加很多无用依赖，执行下面的代码减小保体积
```
pnpm uvm-rm
```

### `v3` 代码块
在 `vue` 文件中，输入 `v3` 按 `tab` 即可快速生成页面模板
> 原理：基于 VSCode 代码块生成

### 登录鉴权
1. 页面如果需要登录才能访问，只需在 `pages.json` 文件中需要鉴权的页面下设置 `needLogin` 属性设置为 `true` 即可，比如
```
{
  "pages": [
    {
      "path": "pages/test/index",
      "needLogin": true,
      "style": {
        "navigationBarTitleText": "",
      },
    }
  ]
}
```

### 注意事项
1. 部分用户构建微信小程序如下错误，原因是微信开发者工具缺失了对应的依赖
```
This @babel/plugin-proposal-private-property-in-object version is not meant to
be imported.
```
此时升级微信开发者工具，或者安装`@babel/plugin-proposal-private-property-in-object`依赖即可解决问题
