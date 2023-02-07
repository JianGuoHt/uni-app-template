# uni-app-template

由于 uni-cli 有一些使用缺陷以及问题，所以采用 HBuild 创建项目；

建议使用 vsCode 开发，HBuild 辅助开发（运行代码）；

注意：

1. 第一次打开项目仍然需要运行 pnpm install。
2. 提交代码报错请查看 [commitlint](https://github.com/conventional-changelog/commitlint) 规范。

# git commit

| **类型** | **概念**                                               |
| :------- | ------------------------------------------------------ |
| build    | 编译相关的修改，例如发布版本、对项目构建或者依赖的改动 |
| ci       | 持续集成修改                                           |
| docs     | 新特性、新功能                                         |
| feat     | 新特性、新功能                                         |
| fix      | 修改 bug                                               |
| perf     | 优化相关，比如提升性能、体验                           |
| refactor | 代码重构                                               |
| revert   | 回滚到上一个版本                                       |
| style    | 代码格式修改, 注意不是 css 修改                        |
| test     | 测试用例修改                                           |
| chore    | 其他修改，比如改变构建流程、或者增加依赖库、工具等     |
