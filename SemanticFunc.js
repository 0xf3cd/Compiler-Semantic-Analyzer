// 这个模块导出一个函数
// 外部模块通过传入某次规约时使用的产生式编号及待规约的结点信息，即可完成一次语义分析

const Node = require('./IR_Node.js');

/**
 * 记录 (产生式编号, 函数) 键值对的 Map
 * 产生式编号为 1 - 58 中的一个整数
 */
const allFuncs = new Map();

/**
 * 以下的函数分别对应 58 条产生式
 * 为规约每一条产生式时，需要进行的语义动作
 * @param right {Array.<Node>}
 * @return {Node}
 */
const f1 = function(right) {
	// S' -> S $ 1
};
allFuncs[1] = f1;

const f2 = function(right) {
	// S -> <Body> $ 2
};
allFuncs[2] = f2;

const f3 = function(right) {
	// S -> <Body> S $ 3
};
allFuncs[3] = f3;

const f4 = function(right) {
	// <Body> -> <Decl> $ 4
};
allFuncs[4] = f4;

const f5 = function(right) {
	// <Decl> -> <VarDecl> $ 5
};
allFuncs[5] = f5;

const f6 = function(right) {
	// <Decl> -> <FuncDecl> $ 6
};
allFuncs[6] = f6;

const f7 = function(right) {
	// <VarDecl> -> int ID ; $ 7
};
allFuncs[7] = f7;

const f8 = function(right) {
	// <VarDecl> -> int ID = <Exprsn> ; $ 8
};
allFuncs[8] = f8;

const f9 = function(right) {
	// <VarDecl> -> float ID ; $ 9
};
allFuncs[9] = f9;

const f10 = function(right) {
	// <VarDecl> -> float ID = <Exprsn> ; $ 10
};
allFuncs[10] = f10;

const f11 = function(right) {
	// <FuncDecl> -> int ID  ( <FormalParams> ) <StmtBlock> $ 11
};
allFuncs[11] = f11;

const f12 = function(right) {
	// <FuncDecl> -> float ID  ( <FormalParams> ) <StmtBlock> $ 12
};
allFuncs[12] = f12;

const f13 = function(right) {
	// <FuncDecl> -> void ID  ( <FormalParams> ) <StmtBlock> $ 13
};
allFuncs[13] = f13;

const f14 = function(right) {
	// <FormalParams> -> <ParamList> $ 14
};
allFuncs[14] = f14;

const f15 = function(right) {
	// <FormalParams> -> void $ 15
};
allFuncs[15] = f15;

const f16 = function(right) {
	// <FormalParams> -> ε $ 16
};
allFuncs[16] = f16;

const f17 = function(right) {
	// <ParamList> -> <Param> $ 17
};
allFuncs[17] = f17;

const f18 = function(right) {
	// <ParamList> -> <Param> , <ParamList> $ 18
};
allFuncs[18] = f18;

const f19 = function(right) {
	// <Param> -> int ID $ 19
};
allFuncs[19] = f19;

const f20 = function(right) {
	// <Param> -> float ID $ 20
};
allFuncs[20] = f20;

const f21 = function(right) {
	// <StmtBlock> -> { <Stmts> } $ 21
};
allFuncs[21] = f21;

const f22 = function(right) {
	// <Stmts> -> <Stmt> <Stmts> $ 22
};
allFuncs[22] = f22;

const f23 = function(right) {
	// <Stmts> -> <Stmt> $ 23
};
allFuncs[23] = f23;

const f24 = function(right) {
	// <Stmt> -> <VarDecl> $ 24
};
allFuncs[24] = f24;

const f25 = function(right) {
	// <Stmt> -> <IfStmt> $ 25
};
allFuncs[25] = f25;

const f26 = function(right) {
	// <Stmt> -> <WhileStmt> $ 26
};
allFuncs[26] = f26;

const f27 = function(right) {
	// <Stmt> -> <ReturnStmt> $ 27
};
allFuncs[27] = f27;

const f28 = function(right) {
	// <Stmt> -> <AssignStmt> $ 28
};
allFuncs[28] = f28;

const f29 = function(right) {
	// <AssignStmt> -> ID = <Exprsn> ; $ 29
};
allFuncs[29] = f29;

const f30 = function(right) {
	// <ReturnStmt> -> return <Exprsn> ; $ 30
};
allFuncs[30] = f30;

const f31 = function(right) {
	// <ReturnStmt> -> return ; $ 31
};
allFuncs[31] = f31;

const f32 = function(right) {
	// <WhileStmt> -> while ( <Exprsn> ) <StmtBlock> $ 32
};
allFuncs[32] = f32;

const f33 = function(right) {
	// <IfStmt> -> if ( <Exprsn> ) <StmtBlock> else <StmtBlock> $ 33
};
allFuncs[33] = f33;

const f34 = function(right) {
	// <IfStmt> -> if ( <Exprsn> ) <StmtBlock> $ 34
};
allFuncs[34] = f34;

const f35 = function(right) {
	// <Exprsn> -> <AddExprsn> $ 35
};
allFuncs[35] = f35;

const f36 = function(right) {
	// <Exprsn> -> <AddExprsn> < <Exprsn> $ 36
};
allFuncs[36] = f36;

const f37 = function(right) {
	// <Exprsn> -> <AddExprsn> <= <Exprsn> $ 37
};
allFuncs[37] = f37;

const f38 = function(right) {
	// <Exprsn> -> <AddExprsn> > <Exprsn> $ 38
};
allFuncs[38] = f38;

const f39 = function(right) {
	// <Exprsn> -> <AddExprsn> >= <Exprsn> $ 39
};
allFuncs[39] = f39;

const f40 = function(right) {
	// <Exprsn> -> <AddExprsn> == <Exprsn> $ 40
};
allFuncs[40] = f40;

const f41 = function(right) {
	// <Exprsn> -> <AddExprsn> != <Exprsn> $ 41
};
allFuncs[41] = f41;

const f42 = function(right) {
	// <AddExprsn> -> <Item> + <AddExprsn> $ 42
};
allFuncs[42] = f42;

const f43 = function(right) {
	// <AddExprsn> -> <Item> - <AddExprsn> $ 43
};
allFuncs[43] = f43;

const f44 = function(right) {
	// <AddExprsn> -> <Item> $ 44
};
allFuncs[44] = f44;

const f45 = function(right) {
	// <Item> -> <Factor> * <Item> $ 45
};
allFuncs[45] = f45;

const f46 = function(right) {
	// <Item> -> <Factor> / <Item> $ 46
};
allFuncs[46] = f46;

const f47 = function(right) {
	// <Item> -> <Factor> $ 47
};
allFuncs[47] = f47;

const f48 = function(right) {
	// <Factor> -> inum $ 48
};
allFuncs[48] = f48;

const f49 = function(right) {
	// <Factor> -> fnum $ 49
};
allFuncs[49] = f49;

const f50 = function(right) {
	// <Factor> -> ( <Exprsn> ) $ 50
};
allFuncs[50] = f50;

const f51 = function(right) {
	// <Factor> -> ID $ 51
};
allFuncs[51] = f51;

const f52 = function(right) {
	// <Factor> -> ID <FuncCall> $ 52
};
allFuncs[52] = f52;

const f53 = function(right) {
	// <FuncCall> -> ( <ActualArgs> ) $ 53
};
allFuncs[53] = f53;

const f54 = function(right) {
	// <ActualArgs> -> <ArgList> $ 54
};
allFuncs[54] = f54;

const f55 = function(right) {
	// <ActualArgs> -> void $ 55
};
allFuncs[55] = f55;

const f56 = function(right) {
	// <ActualArgs> -> ε $ 56
};
allFuncs[56] = f56;

const f57 = function(right) {
	// <ArgList> -> <Exprsn> , <ArgList> $ 57
};
allFuncs[57] = f57;

const f58 = function(right) {
    // <ArgList> -> <Exprsn> $ 58
    
};
allFuncs[58] = f58;

/**
 * 根据传输的产生式编号和待规约结点数组，利用相关的语义分析函数进行分析
 * @param {number} no 
 * @param {Aarray.<Node>} right 
 */
const analyze = function(no, right) {
    const f = allFuncs[no];
    return f(right);
};