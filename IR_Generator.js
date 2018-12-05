// 中间代码生成类
const fs = require('fs');
const readline = require('readline');
const FST = require('./FuncSymbolTable.js');
const VST = require('./VarSymbolTable.js');

/**
 * 带属性的结点类（属性用于语义分析）
 * @class
 */
class Node {
    constructor() {
        /**
         * 结点名
         * 如 'S' '<FuncDecl>' 'Stmt'
         * @public
         * @type {string}
         */
        this.name = '';

        /**
         * 中间代码，对应 .xlsx 中的 IR
         * @public
         * @type {string}
         */
        this.IR = '';

        /**
         * 变量值，对应 val
         * 以字符串的形式储存，可以是数也可以是变量名，如 '1.5' '10' 'a'
         * @public
         * @type {string}
         */
        this.val = '';

        /**
         * 变量种类，对应 valType
         * 如 'int' 'float' 
         * @public
         * @type {string}
         */
        this.valType = '';

        /**
         * 函数返回值类型，对应 returnType
         * 'int' 'float' 'void'
         * @public
         * @type {string}
         */
        this.returnType  = '';

        /**
         * 函数形参名，对应 paramName
         * @public
         * @type {Array.<string>}
         */
        this.paramName = new Array();

        /**
         * 函数形参类型，对应 paramType
         * @public
         * @type {Array.<string>}
         */
        this.paramType = new Array();

        /**
         * 内部变量声明数，对应 innerVarAmount
         * @public
         * @type {number}
         */
        this.innerVarAmount = 0;

        /**
         * 函数调用时形参，对应 args
         * @public
         * @type {Array.<string>}
         */
        this.args = new Array();

        /**
         * 函数调用时形参类型，对应 argType
         * @public
         * @type {Array.<string>}
         */
        this.argType = new Array();
    }
}

/**
 * 中间代码生成器类
 * @class
 */
class IR_Generator {
    constructor() {
        /**
         * 产生式标号表的地址
         * @private
         * @type {string}
         */
        this._filePath = './Grammar/Production-No.txt';

        /**
         * 产生式编号表
         * 通过读取文件获取
         * @private
         * @type {Map<string, number>}
         */
        this._prodNo = new Map();

        /**
         * 是否读取完毕
         * @private
         * @type {boolean}
         */
        this._fileReadFinish = false;

        /**
         * 函数表
         * @private
         * @type {Object}
         */
        this._funcTable = new FST();

        /**
         * 变量表
         * @private
         * @type {Object}
         */
        this._varTable = new VST();

        /**
         * 在语义分析过程中的当前顶层节点
         * 类似 Parser 中的 topNodes，但是每个结点处多了属性
         * @private
         * @type {Array.<Node>}
         */
        this._topNodes = new Array();
    }
}

/**
 * 设置文件地址
 * @public
 * @param newFilePath {string}
 */
IR_Generator.prototype.setFilePath = function(newFilePath) {
    this._filePath = newFilePath;
};

/**
 * 读取产生式编号表
 * @public
 */
IR_Generator.prototype.readProdNoFile = function() {
    const data = fs.readFileSync(this._filePath).toString();
    const prods = data.split('\n');

    for(let p of prods) {
        let left = '';
        let right = '';
        let no = -1;

        const splitResult1 = p.split(' -> ');
        left = splitResult1[0].trim(); // 得到产生式左部
        const splitResult2 = splitResult1[1].split('$');
        right = splitResult2[0].trim(); // 得到产生式右部
        no = splitResult2[1]; // 得到产生式标号

        this._prodNo[`${left} ${right}`] = parseInt(no); // 将产生式左部和右部接合作为键，编号作为值，加入 map 中
    }

    // console.log(this._prodNo);
    this._fileReadFinish = true;
};

const IR = new IR_Generator();
IR.readProdNoFile();

module.exports = IR_Generator;