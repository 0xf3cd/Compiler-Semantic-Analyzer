// 这个模块导出一个函数
// 外部模块通过传入某次规约时使用的产生式编号及待规约的结点信息，即可完成一次语义分析

const Node = require('./IR_Node.js');

// 工具函数
/**
 * deepCopy 函数说明: 进行深拷贝，将 oldObject 深拷贝至 newObject
 * 可以对传入参数中的数组和对象递归进行深拷贝
 * @param {*} oldObject
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
 * 记录 (产生式编号, 函数) 键值对的 Map
 * 产生式编号为 1 - 58 中的一个整数
 */
const allFuncs = new Map();

/**
 * 以下的函数分别对应 58 条产生式
 * 为规约每一条产生式时，需要进行的语义动作
 * @param right {Array.<Node>} 产生式右部
 * @param VST {Object} 符号表
 * @param FST {Object} 函数表
 * @return {Node}
 */
const f1 = function(right, VST, FST) {
	// S' -> S $ 1
};
allFuncs[1] = f1;

const f2 = function(right, VST, FST) {
	// S -> <Body> $ 2
};
allFuncs[2] = f2;

const f3 = function(right, VST, FST) {
	// S -> <Body> S $ 3
};
allFuncs[3] = f3;

const f4 = function(right, VST, FST) {
	// <Body> -> <Decl> $ 4
};
allFuncs[4] = f4;

const f5 = function(right, VST, FST) {
	// <Decl> -> <VarDecl> $ 5
};
allFuncs[5] = f5;

const f6 = function(right, VST, FST) {
	// <Decl> -> <FuncDecl> $ 6
};
allFuncs[6] = f6;

const f7 = function(right, VST, FST) {
	// <VarDecl> -> int ID ; $ 7
};
allFuncs[7] = f7;

const f8 = function(right, VST, FST) {
	// <VarDecl> -> int ID = <Exprsn> ; $ 8
};
allFuncs[8] = f8;

const f9 = function(right, VST, FST) {
	// <VarDecl> -> float ID ; $ 9
};
allFuncs[9] = f9;

const f10 = function(right, VST, FST) {
	// <VarDecl> -> float ID = <Exprsn> ; $ 10
};
allFuncs[10] = f10;

const f11 = function(right, VST, FST) {
	// <FuncDecl> -> int ID  ( <FormalParams> ) <StmtBlock> $ 11
};
allFuncs[11] = f11;

const f12 = function(right, VST, FST) {
	// <FuncDecl> -> float ID  ( <FormalParams> ) <StmtBlock> $ 12
};
allFuncs[12] = f12;

const f13 = function(right, VST, FST) {
	// <FuncDecl> -> void ID  ( <FormalParams> ) <StmtBlock> $ 13
};
allFuncs[13] = f13;

const f14 = function(right, VST, FST) {
	// <FormalParams> -> <ParamList> $ 14
};
allFuncs[14] = f14;

const f15 = function(right, VST, FST) {
	// <FormalParams> -> void $ 15
};
allFuncs[15] = f15;

const f16 = function(right, VST, FST) {
	// <FormalParams> -> ε $ 16
};
allFuncs[16] = f16;

const f17 = function(right, VST, FST) {
	// <ParamList> -> <Param> $ 17
};
allFuncs[17] = f17;

const f18 = function(right, VST, FST) {
	// <ParamList> -> <Param> , <ParamList> $ 18
};
allFuncs[18] = f18;

const f19 = function(right, VST, FST) {
	// <Param> -> int ID $ 19
};
allFuncs[19] = f19;

const f20 = function(right, VST, FST) {
	// <Param> -> float ID $ 20
};
allFuncs[20] = f20;

const f21 = function(right, VST, FST) {
	// <StmtBlock> -> { <Stmts> } $ 21
};
allFuncs[21] = f21;

const f22 = function(right, VST, FST) {
	// <Stmts> -> <Stmt> <Stmts> $ 22
};
allFuncs[22] = f22;

const f23 = function(right, VST, FST) {
	// <Stmts> -> <Stmt> $ 23
};
allFuncs[23] = f23;

const f24 = function(right, VST, FST) {
	// <Stmt> -> <VarDecl> $ 24
};
allFuncs[24] = f24;

const f25 = function(right, VST, FST) {
	// <Stmt> -> <IfStmt> $ 25
};
allFuncs[25] = f25;

const f26 = function(right, VST, FST) {
	// <Stmt> -> <WhileStmt> $ 26
};
allFuncs[26] = f26;

const f27 = function(right, VST, FST) {
	// <Stmt> -> <ReturnStmt> $ 27
};
allFuncs[27] = f27;

const f28 = function(right, VST, FST) {
	// <Stmt> -> <AssignStmt> $ 28
};
allFuncs[28] = f28;

const f29 = function(right, VST, FST) {
	// <AssignStmt> -> ID = <Exprsn> ; $ 29
};
allFuncs[29] = f29;

const f30 = function(right, VST, FST) {
	// <ReturnStmt> -> return <Exprsn> ; $ 30
};
allFuncs[30] = f30;

const f31 = function(right, VST, FST) {
	// <ReturnStmt> -> return ; $ 31
};
allFuncs[31] = f31;

const f32 = function(right, VST, FST) {
	// <WhileStmt> -> while ( <Exprsn> ) <StmtBlock> $ 32
};
allFuncs[32] = f32;

const f33 = function(right, VST, FST) {
	// <IfStmt> -> if ( <Exprsn> ) <StmtBlock> else <StmtBlock> $ 33
};
allFuncs[33] = f33;

const f34 = function(right, VST, FST) {
	// <IfStmt> -> if ( <Exprsn> ) <StmtBlock> $ 34
};
allFuncs[34] = f34;

const f35 = function(right, VST, FST) {
	// <Exprsn> -> <AddExprsn> $ 35
};
allFuncs[35] = f35;

const f36 = function(right, VST, FST) {
	// <Exprsn> -> <AddExprsn> < <Exprsn> $ 36
};
allFuncs[36] = f36;

const f37 = function(right, VST, FST) {
	// <Exprsn> -> <AddExprsn> <= <Exprsn> $ 37
};
allFuncs[37] = f37;

const f38 = function(right, VST, FST) {
	// <Exprsn> -> <AddExprsn> > <Exprsn> $ 38
};
allFuncs[38] = f38;

const f39 = function(right, VST, FST) {
	// <Exprsn> -> <AddExprsn> >= <Exprsn> $ 39
};
allFuncs[39] = f39;

const f40 = function(right, VST, FST) {
	// <Exprsn> -> <AddExprsn> == <Exprsn> $ 40
};
allFuncs[40] = f40;

const f41 = function(right, VST, FST) {
	// <Exprsn> -> <AddExprsn> != <Exprsn> $ 41
};
allFuncs[41] = f41;

const f42 = function(right, VST, FST) {
	// <AddExprsn> -> <Item> + <AddExprsn> $ 42
};
allFuncs[42] = f42;

const f43 = function(right, VST, FST) {
	// <AddExprsn> -> <Item> - <AddExprsn> $ 43
};
allFuncs[43] = f43;

const f44 = function(right, VST, FST) {
	// <AddExprsn> -> <Item> $ 44
};
allFuncs[44] = f44;

const f45 = function(right, VST, FST) {
	// <Item> -> <Factor> * <Item> $ 45
};
allFuncs[45] = f45;

const f46 = function(right, VST, FST) {
	// <Item> -> <Factor> / <Item> $ 46
};
allFuncs[46] = f46;

const f47 = function(right, VST, FST) {
	// <Item> -> <Factor> $ 47
};
allFuncs[47] = f47;

const f48 = function(right, VST, FST) {
	// <Factor> -> inum $ 48
};
allFuncs[48] = f48;

const f49 = function(right, VST, FST) {
	// <Factor> -> fnum $ 49
};
allFuncs[49] = f49;

const f50 = function(right, VST, FST) {
	// <Factor> -> ( <Exprsn> ) $ 50
};
allFuncs[50] = f50;

const f51 = function(right, VST, FST) {
	// <Factor> -> ID $ 51
	console.log(100);
};
allFuncs[51] = f51;

const f52 = function(right, VST, FST) {
	// <Factor> -> ID <FuncCall> $ 52
	const F = new Node();
	const ID = deepCopy(right[0]);
	const FC = deepCopy(right[1]);

	if(FST.hasFunc()) {

	}
};
allFuncs[52] = f52;

const f53 = function(right, VST, FST) {
	// <FuncCall> -> ( <ActualArgs> ) $ 53
	const F = new Node();
	const Ac = deepCopy(right[0]);

	F.args = Ac.args;
	F.argType = Ac.argType;

	return F;
};
allFuncs[53] = f53;

const f54 = function(right, VST, FST) {
	// <ActualArgs> -> <ArgList> $ 54
	const Ac = new Node();
	const Arg = deepCopy(right[0]);

	Ac.args = Arg.args;
	Ac.argType = Arg.argType;

	return Ac;
};
allFuncs[54] = f54;

const f55 = function(right, VST, FST) {
	// <ActualArgs> -> void $ 55
	const A = new Node();
	
	A.args = new Array();
	A.argType = new Array();

	return A;
};
allFuncs[55] = f55;

const f56 = function(right, VST, FST) {
	// <ActualArgs> -> ε $ 56
	const A = new Node();

	A.args = new Array();
	A.argType = new Array();

	return A;
};
allFuncs[56] = f56;

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
allFuncs[57] = f57;

const f58 = function(right, VST, FST) {
    // <ArgList> -> <Exprsn> $ 58
	const A = new Node();
	const E = deepCopy(right[0]);

	A.args.unshift(E.val);
	A.argType.unshift(E.valType);

	return A;
};
allFuncs[58] = f58;

/**
 * 根据传输的产生式编号和待规约结点数组，利用相关的语义分析函数进行分析
 * @param {number} no 
 * @param {Aarray.<Node>} right 
 * @param {Object} VST 
 * @param {Object} FST
 */
const getFunc = function(no, right, VST, FST) {
    const f = allFuncs[no];
    return f;
};

module.exports = {
	'getFunc': getFunc
};