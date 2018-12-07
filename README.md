# Compiler-Semantic-Analyzer

## First of All

- 结合 `LLVM` 已经可以生成可执行文件（Mac 上）
- 在不修改代码的情况下，执行 `node main.js` 可以生成 `./Source/Example.cmm` 对应的中间代码，中间代码存放在 `./IR.ll` 中
- 进入中间代码所在目录后，直接执行 `clang -o test LR.ll` 可以得到可执行文件 `test`
- 用 `C` 语言为大作业所用语言写了简单的输入输出函数以及类型转换函数（可以输入数出整型、浮点型和字符）
- 对老师提供的文法进行了很大改进（？）

## 说明

- 项目基于先前 LR 分析方法的语法分析器，增加了 `float` 类型的数据，同时调整了文法，使得文法更为简洁
- 语义检查过程中进行变量作用域检查、类型检查、函数参数检查等等
- 生成的中间代码为 `LLVM IR` 形式
- 由 C++ 完成了链接库 `LR.dll` 及 `LR.dylib`
- 后续工作由 JavaScript 完成，使用 `Electron` 作为跨平台的图形开发框架
- 使用 `ffi, ref-struct` 等 node 库来调用动态链接库
- `./DyLib/` 中存放 Mac 和 Windows 下的动态链接库
- `./Grammar/` 中存放语法描述文件
- `./Source/` 中存放待分析源代码
- `./IR/` 中存放生成的中间代码
- `./LR.js` 是已经通过 `ffi` `ref-struct` 封装好的 js 库，可以直接在其他 js 模块中调用
- `./main.js` 中调用 `Parser.js` 从而完成了语法分析，具体可以运行 `node main.js`
- 详细终结符和产生式定义，请参见 `./Assignment/*.pdf`


## 准备工作 1 - NVM

- 由于版本限制，使用 `ffi` 时，必须使用低版本的 `Node.js`，所以考虑使用 `nvm` 工具进行版本管理
- 略去 Mac 上的配置过程，简要介绍 Windows 上的配置过程
  1. 下载 `nvm-setup.zip` from `https://github.com/coreybutler/nvm-windows/releases`

  2. 根据提示安装即可

  3. 在命令行中输入 `nvm install v8.11.3` 安装低版本的 `Node.js`

  4. 命令行中输入 `nvm on` 及 `nvm use v8.11.3` 启用低版本

  5. 至此 `nvm` 配置完毕，执行 `node -v` 应当能够显示版本号 `8.11.3`


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

1. js 语法（很简单，注意闭包，回调函数，匿名函数，箭头函数等等新概念即可）
2. 了解 `Node.js` 中调用和自行编写库的方法 （使用 `require`, `module.exports` 等）
3. 学习网页开发
4. 学会使用常用的动画效果、图形展示的 js 库



## 之后的工作

1.  ~~将动态链接库包装成 js 可以直接使用的函数，并封装在 `LR.js `模块中~~
2.  ~~生成语法分析树~~
3.  ~~调整文法，进行语义动作设计~~ 具体文法和终结符可以参见 `./Assignments/*.pdf`
4.  ~~进行语义分析（包括类型检查等）~~
5.  ~~生成中间代码~~
6.  ~~修正综合属性、测试~~
7.  编写将浮点型的数的字面量转换成 `LLVM` 支持形式的函数
8.  调整中间代码输出形式，使其更美观
9.  考虑加入新的类型 `string` 
10. 开发图形界面 with `HTML，CSS，JavaScript`
11. 利用 `Electron` 打包成为桌面应用，`Electron` 可以理解成 `Node.js` 中的一个库（和 `ffi` 一样是库）


## 变元表

- 以 `Grammar.txt` 为例
- 文法需要为 `SLR1` 的
- 基于老师所给定文法的调整（列出部分）
    * 变量名中可以有下划线，如 `user_input`
    * 数可以由负号开头，如 `int x = -100;`
    * 可以在代码任意处声明变量，不一定要在函数最开始时声明；也可以申明全局变量
    * 可以给变量赋初值，默认为 0
    * 有浮点型和整型两种的数据类型，不做类型提升，但提供类型转换函数 `ftoi, itof`，可以直接调用
    * 函数声明和调用时，如果不需要参数，可以在括号内写 `void` 或者不写 
    * 关系运算符、加减乘除等都视作二元运算符，可以同时出现在一个式子内，如 `1 >= (2 + 4) * 5`、`(1 == 2) + 3`
        * 关系运算符优先级最低，运算结果为整型的 `1 or 0`
        * 加减运算符比关系运算符高，乘除又比加减高
        * 括号最高
    * `while, if` 语句中，当且仅当括号内的表达式值为整数 1 时，条件才为真

|      |      English       |      Chinese       |                 Remark                  |
| :--: | :----------------: | :----------------: | :-------------------------------------: |
|  1   |         S'         |  拓广文法起始变元  |                                         |
|  2   |         S          |      起始变元      |                                         |
|  3   |      \<Body\>      |        主体        |                                         |
|  4   |      \<Decl\>      |        声明        |         Decl for Declaration          |
|  5   |    \<FuncDecl\>    |      函数声明      |                                         |
|  6   |    \<VarDecl\>     |      变量声明      |                                         |
|  7   |  \<FormalParams\>  |        形参        |          Param for Parameter          |
|  8   |   \<StmtBlock\>    |       语句块       |          Stmt for Statement           |
|  9   |   \<ParamList\>    |       形参表       |                                         |
|  10  |     \<Param\>      |        参数        |                                         |
|  11  |     \<Stmts\>      |       语句串       |                                         |
|  12  |      \<Stmt\>      |        语句        |                                         |
|  13  |     \<IfStmt\>     |       if语句       |                                         |
|  14  |   \<WhileStmt\>    |     while语句      |                                         |
|  15  |   \<ReturnStmt\>   |     return语句     |                                         |
|  16  |   \<AssignStmt\>   |      赋值语句      |                                         |
|  17  |     \<Exprsn\>     |       表达式       |         Exprsn for Expression         |
|  18  |   \<AddExprsn\>    |     加法表法式     |                                         |
|  19  |      \<Item\>      |         项         |                                         |
|  20  |     \<Factor\>     |        因子        |      因子与因子间可能有乘法或除法       |
|  21  |    \<FuncCall\>    |      函数调用      |                                         |
|  22  |   \<ActualArgs\>   |        实参        |                                         |
|  23  |    \<ArgList\>     |      实参列表      |                                         |