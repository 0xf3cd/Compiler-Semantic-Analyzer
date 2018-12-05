// 中间代码生成类
const fs = require('fs');
const Node = require('./IR_Node.js');
const FST = require('./FuncSymbolTable.js');
const VST = require('./VarSymbolTable.js');

// 工具函数
/**
 * deepCopy 函数说明: 进行深拷贝，将 oldObject 深拷贝至 newObject
 * 可以对传入参数中的数组和对象递归进行深拷贝
 * @param {any} oldObject
 * @return {Object}: 一个值与 oldObject 相同的对象
 */
const deepCopy = function(oldObject) {
	if(typeof(oldObject) !== 'object' && Array.isArray(oldObject) !== true) {
		return oldObject;
	}
	let newObject;

	if(Array.isArray(oldObject)) {
		newObject = new Array();
		for(let each of oldObject) {
			if(typeof(each) === 'object' || Array.isArray(each)) {
				newObject.push(deepCopy(each));
			} else {
				newObject.push(each);
			}
		}
	} else {
		newObject = new Object();
		for(let each in oldObject) {
			if(oldObject[each] === null || oldObject[each] === undefined) {
				newObject[each] = oldObject[each];
			} else if(typeof(oldObject[each]) === 'object' && !oldObject[each].length) {
				newObject[each] = deepCopy(oldObject[each]);
			} else {
				newObject[each] = oldObject[each];
			}
		}
	}
	
	return newObject;
};



/**
 * 临时变量分配机构
 * @class
 */
class TempAllocator {
	constructor() {
		this._count = 0;
	}
}


/**
 * 以下的函数分别对应 58 条产生式
 * 为规约每一条产生式时，需要进行的语义动作
 * 由于 js 的语法缺陷，如果直接将这些函数成为成员变量，则会有 this 指针指向混乱的情况
 * 所以单列成 58 个函数，作为中间代码生成器类中成员 _allFuncs 数组的成员
 * @param right {Array.<Node>} 产生式右部
 * @param VST {Object} 符号表
 * @param FST {Object} 函数表
 * @return {Node}
 */
const f1 = function(right, VST, FST) {
	// S' -> S $ 1
};

const f2 = function(right, VST, FST) {
	// S -> <Body> $ 2
};

const f3 = function(right, VST, FST) {
	// S -> <Body> S $ 3
};

const f4 = function(right, VST, FST) {
	// <Body> -> <Decl> $ 4
};

const f5 = function(right, VST, FST) {
	// <Decl> -> <VarDecl> $ 5
};

const f6 = function(right, VST, FST) {
	// <Decl> -> <FuncDecl> $ 6
};

const f7 = function(right, VST, FST) {
	// <VarDecl> -> int ID ; $ 7
};

const f8 = function(right, VST, FST) {
	// <VarDecl> -> int ID = <Exprsn> ; $ 8
};

const f9 = function(right, VST, FST) {
	// <VarDecl> -> float ID ; $ 9
};

const f10 = function(right, VST, FST) {
	// <VarDecl> -> float ID = <Exprsn> ; $ 10
};

const f11 = function(right, VST, FST) {
	// <FuncDecl> -> int ID  ( <FormalParams> ) <StmtBlock> $ 11
};

const f12 = function(right, VST, FST) {
	// <FuncDecl> -> float ID  ( <FormalParams> ) <StmtBlock> $ 12
};

const f13 = function(right, VST, FST) {
	// <FuncDecl> -> void ID  ( <FormalParams> ) <StmtBlock> $ 13
};

const f14 = function(right, VST, FST) {
	// <FormalParams> -> <ParamList> $ 14
};

const f15 = function(right, VST, FST) {
	// <FormalParams> -> void $ 15
};

const f16 = function(right, VST, FST) {
	// <FormalParams> -> ε $ 16
};

const f17 = function(right, VST, FST) {
	// <ParamList> -> <Param> $ 17
};

const f18 = function(right, VST, FST) {
	// <ParamList> -> <Param> , <ParamList> $ 18
};

const f19 = function(right, VST, FST) {
	// <Param> -> int ID $ 19
};

const f20 = function(right, VST, FST) {
	// <Param> -> float ID $ 20
};

const f21 = function(right, VST, FST) {
	// <StmtBlock> -> { <Stmts> } $ 21
};

const f22 = function(right, VST, FST) {
	// <Stmts> -> <Stmt> <Stmts> $ 22
};

const f23 = function(right, VST, FST) {
	// <Stmts> -> <Stmt> $ 23
};

const f24 = function(right, VST, FST) {
	// <Stmt> -> <VarDecl> $ 24
};

const f25 = function(right, VST, FST) {
	// <Stmt> -> <IfStmt> $ 25
};

const f26 = function(right, VST, FST) {
	// <Stmt> -> <WhileStmt> $ 26
};

const f27 = function(right, VST, FST) {
	// <Stmt> -> <ReturnStmt> $ 27
};

const f28 = function(right, VST, FST) {
	// <Stmt> -> <AssignStmt> $ 28
};

const f29 = function(right, VST, FST) {
	// <AssignStmt> -> ID = <Exprsn> ; $ 29
};

const f30 = function(right, VST, FST) {
	// <ReturnStmt> -> return <Exprsn> ; $ 30
};

const f31 = function(right, VST, FST) {
	// <ReturnStmt> -> return ; $ 31
};

const f32 = function(right, VST, FST) {
	// <WhileStmt> -> while ( <Exprsn> ) <StmtBlock> $ 32
};

const f33 = function(right, VST, FST) {
	// <IfStmt> -> if ( <Exprsn> ) <StmtBlock> else <StmtBlock> $ 33
};

const f34 = function(right, VST, FST) {
	// <IfStmt> -> if ( <Exprsn> ) <StmtBlock> $ 34
};

const f35 = function(right, VST, FST) {
	// <Exprsn> -> <AddExprsn> $ 35
};

const f36 = function(right, VST, FST) {
	// <Exprsn> -> <AddExprsn> < <Exprsn> $ 36
};

const f37 = function(right, VST, FST) {
	// <Exprsn> -> <AddExprsn> <= <Exprsn> $ 37
};

const f38 = function(right, VST, FST) {
	// <Exprsn> -> <AddExprsn> > <Exprsn> $ 38
};

const f39 = function(right, VST, FST) {
	// <Exprsn> -> <AddExprsn> >= <Exprsn> $ 39
};

const f40 = function(right, VST, FST) {
	// <Exprsn> -> <AddExprsn> == <Exprsn> $ 40
};

const f41 = function(right, VST, FST) {
	// <Exprsn> -> <AddExprsn> != <Exprsn> $ 41
};

const f42 = function(right, VST, FST) {
	// <AddExprsn> -> <Item> + <AddExprsn> $ 42
};

const f43 = function(right, VST, FST) {
	// <AddExprsn> -> <Item> - <AddExprsn> $ 43
};

const f44 = function(right, VST, FST) {
	// <AddExprsn> -> <Item> $ 44
};

const f45 = function(right, VST, FST) {
	// <Item> -> <Factor> * <Item> $ 45
};

const f46 = function(right, VST, FST) {
	// <Item> -> <Factor> / <Item> $ 46
};

const f47 = function(right, VST, FST) {
	// <Item> -> <Factor> $ 47
};

const f48 = function(right, VST, FST) {
	// <Factor> -> inum $ 48
};

const f49 = function(right, VST, FST) {
	// <Factor> -> fnum $ 49
};

const f50 = function(right, VST, FST) {
	// <Factor> -> ( <Exprsn> ) $ 50
};

const f51 = function(right, VST, FST) {
	// <Factor> -> ID $ 51
	console.log(100);
};

const f52 = function(right, VST, FST) {
	// <Factor> -> ID <FuncCall> $ 52
	const F = new Node();
	const ID = deepCopy(right[0]);
	const FC = deepCopy(right[1]);

	if(FST.hasFunc()) {

	}
};

const f53 = function(right, VST, FST) {
	// <FuncCall> -> ( <ActualArgs> ) $ 53
	const F = new Node();
	const Ac = deepCopy(right[0]);

	F.args = Ac.args;
	F.argType = Ac.argType;

	return F;
};

const f54 = function(right, VST, FST) {
	// <ActualArgs> -> <ArgList> $ 54
	const Ac = new Node();
	const Arg = deepCopy(right[0]);

	Ac.args = Arg.args;
	Ac.argType = Arg.argType;

	return Ac;
};

const f55 = function(right, VST, FST) {
	// <ActualArgs> -> void $ 55
	const A = new Node();
	
	A.args = new Array();
	A.argType = new Array();

	return A;
};

const f56 = function(right, VST, FST) {
	// <ActualArgs> -> ε $ 56
	const A = new Node();

	A.args = new Array();
	A.argType = new Array();

	return A;
};

const f57 = function(right, VST, FST) {
	// <ArgList> -> <Exprsn> , <ArgList> $ 57
	const A1 = new Node();
	const E = deepCopy(right[0]);
	const A2 = deepCopy(right[2]);

	A1.args = A2.args;
	A1.argType = A2.argType;
	A1.args.unshift(E.val);
	A1.argType.unshift(E.valType);
	
	return A1;
};

const f58 = function(right, VST, FST) {
    // <ArgList> -> <Exprsn> $ 58
	const A = new Node();
	const E = deepCopy(right[0]);

	A.args.unshift(E.val);
	A.argType.unshift(E.valType);

	return A;
};
// 类外语义分析处理函数到此结束

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

        /**
         * 记录语义分析处理函数的数组
         * @private
         * @type {Map.<number, Function>}
         */
        this._allFuncs = new Map();

        this.initialize();
    }
}

/**
 * 设置文件地址
 * @public
 * @param {string} newFilePath
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

/**
 * 根据传入的 Record 对象，选取本次规约应当使用的语义分析和处理函数
 * @private
 * @param {Object} record 
 * @return {Function} 返回应该执行的处理函数
 */
IR_Generator.prototype._getFunc = function(record) {};

/**
 * 根据传入的 Record 对象，进行一次语义分析操作
 * @public
 * @param {Object} record
 */
IR_Generator.prototype.analyze = function(record) {};

IR_Generator.prototype.initialize = function() {
    this._allFuncs[1] = f1;
    this._allFuncs[2] = f2;
    this._allFuncs[3] = f3;
    this._allFuncs[4] = f4;
    this._allFuncs[5] = f5;
    this._allFuncs[6] = f6;
    this._allFuncs[7] = f7;
    this._allFuncs[8] = f8;
    this._allFuncs[9] = f9;
    this._allFuncs[10] = f10;
    this._allFuncs[11] = f11;
    this._allFuncs[12] = f12;
    this._allFuncs[13] = f13;
    this._allFuncs[14] = f14;
    this._allFuncs[15] = f15;
    this._allFuncs[16] = f16;
    this._allFuncs[17] = f17;
    this._allFuncs[18] = f18;
    this._allFuncs[19] = f19;
    this._allFuncs[20] = f20;
    this._allFuncs[21] = f21;
    this._allFuncs[22] = f22;
    this._allFuncs[23] = f23;
    this._allFuncs[24] = f24;
    this._allFuncs[25] = f25;
    this._allFuncs[26] = f26;
    this._allFuncs[27] = f27;
    this._allFuncs[28] = f28;
    this._allFuncs[29] = f29;
    this._allFuncs[30] = f30;
    this._allFuncs[31] = f31;
    this._allFuncs[32] = f32;
    this._allFuncs[33] = f33;
    this._allFuncs[34] = f34;
    this._allFuncs[35] = f35;
    this._allFuncs[36] = f36;
    this._allFuncs[37] = f37;
    this._allFuncs[38] = f38;
    this._allFuncs[39] = f39;
    this._allFuncs[40] = f40;
    this._allFuncs[41] = f41;
    this._allFuncs[42] = f42;
    this._allFuncs[43] = f43;
    this._allFuncs[44] = f44;
    this._allFuncs[45] = f45;
    this._allFuncs[46] = f46;
    this._allFuncs[47] = f47;
    this._allFuncs[48] = f48;
    this._allFuncs[49] = f49;
    this._allFuncs[50] = f50;
    this._allFuncs[51] = f51;
    this._allFuncs[52] = f52;
    this._allFuncs[53] = f53;
    this._allFuncs[54] = f54;
    this._allFuncs[55] = f55;
    this._allFuncs[56] = f56;
    this._allFuncs[57] = f57;
    this._allFuncs[58] = f58;
};



const IR = new IR_Generator();
IR.readProdNoFile();
const x = IR._allFuncs[51];
x();

module.exports = IR_Generator;