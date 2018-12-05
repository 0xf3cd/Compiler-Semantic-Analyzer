// 中间代码生成类
const fs = require('fs');
const readline = require('readline');
const FST = require('./FuncSymbolTable.js');
const VST = require('./VarSymbolTable.js');

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