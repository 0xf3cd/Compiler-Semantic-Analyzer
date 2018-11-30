# Compiler-Syntax-Analyzer

## 说明

- 项目延续 LR 分析方法的语法分析器
- 由 C++ 完成了链接库 `LR.dll` 及 `LR.dylib`
- 后续工作由 JavaScript 完成，使用 `Electron` 作为跨平台的图形开发框架
- 使用 `ffi, ref-struct` 等 node 库来调用动态链接库
- `./Dylib/` 中存放 Mac 和 Windows 下的动态链接库
- `./TestFile` 中存放语法描述文件和待分析源代码
- `./LR.js` 是已经通过 `ffi` `ref-struct` 封装好的 js 库，可以直接在其他 js 模块中调用
- `./main.js` 中调用 `LR.js` 从而完成了语法分析，具体可以运行 `node main.js`


## 准备工作 1 - NVM

- 由于版本限制，使用 `ffi` 时，必须使用低版本的 `Node.js`，所以考虑使用 `nvm` 工具进行版本管理
- 略去 Mac 上的配置过程，简要介绍 Windows 上的配置过程
  1. 下载 `nvm-setup.zip` from `https://github.com/coreybutler/nvm-windows/releases`

  2. 根据提示安装即可

  3. 在命令行中输入 `nvm install v8.11.3` 安装低版本的 `Node.js`

  4. 命令行中输入 `nvm on` 及 `nvm use v8.11.3` 启用低版本

  5. 至此 `nvm` 配置完毕


## 准备工作 2 - 安装 Python2.7

- 安装 `ffi` 时不能使用 Python3
- 略去 Mac 上的配置过程，介绍 Windows 上的配置过程
  1. From `https://www.python.org/downloads/release/python-2715/` download `.msi` 安装文件

  2. 按提示安装到某个目录中，不需要再额外配置环境变量了


## 准备工作 3 - 安装开发过程中需要用到的库

- 由于需要使用的库已经记录在 `./package.json` 中，故进入根目录后，可以直接执行 `npm install --python=X:\The\Path\To\Python2`，其中 Python2 的路径即是 `准备工作 2` 中所安装的 `python.exe` 的路径
- 等待安装完成即可
- 之后如果增加了新的库，重新执行 `npm install --python=X:\...\python.exe` 即可


## 如何运行

- 在命令行中输入 `node xxx.js` 即可以命令行的方式运行 js 代码
- 输入 `npm run` 或 `electron .` 即可查看图形界面（暂时还未实现）
- 现在运行 `node main.js` 可以检测工具是否都已经配置成功


## 组员需要补充的知识

1. js 语法（很简单，注意闭包，回调函数，匿名函数等等新概念即可）
2. 了解 `Node.js` 中调用和自行编写库的方法 （使用 `require`, `module.exports` 等）
3. 学习网页开发
4. 学会使用常用的动画效果、图形展示的 js 库



## 之后的工作

1.  生成语法分析树
2.  进行语义分析并生成中间代码
3.  开发图形界面 with `HTML，CSS，JavaScript`
4.  利用 `Electron` 打包成为桌面应用，`Electron` 可以理解成 `Node.js` 中的一个库（和 `ffi` 一样是库）

