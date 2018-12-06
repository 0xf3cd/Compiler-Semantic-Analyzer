// 中间代码生成类
const fs = require('fs');
const Node = require('./IR_Node.js');
const FuncTable = require('./FuncSymbolTable.js');
const VarTable = require('./VarSymbolTable.js');
const representFloat = require('./RepresentFloat.js').representFloat;

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
 * 判断一个字符串中是否有字母
 * @param {string} input
 * @return {boolean}
 */
const hasLetter = function(input) {
    for(let each of input) {
        if(each >= 'A' && each <= 'Z') {
            return true;
        } else if(each >= 'a' && each <= 'z') {
            return true;
        }
    }
    return false;
};



/**
 * 临时变量分配机构
 * @class
 */
class TempAllocator {
	constructor() {
        /**
         * 记录当前分配临时变量的编号
         */
		this._count = 0;
	}
}

/**
 * 临时变量分配机构复位
 * @public
 */
TempAllocator.prototype.reset = function() {
    this._count = 0;
};

/** 
 * 获取一个临时变量名
 * @public
 * @return {string}
 */
TempAllocator.prototype.getNewTemp = function() {
    const varName = `tmp${this._count}`;
    this._count++;
    return varName;
}

const TA = new TempAllocator();



/** 
 * 标签名分配机构
 * @class
 */
class LabelAllocator {
	constructor() {
        /**
         * 记录当前分配标签的编号
         */
		this._count = 0;
	}
}

/**
 * 标签名分配机构复位
 * @public
 */
LabelAllocator.prototype.reset = function() {
    this._count = 0;
};

/** 
 * 获取一个标签名
 * @public
 * @return {string}
 */
LabelAllocator.prototype.getNewLabel = function() {
    const labelName = `L${this._count}`;
    this._count++;
    return labelName;
}

const LA = new LabelAllocator();



/**
 * 以下的函数分别对应 58 条产生式
 * 为规约每一条产生式时，需要进行的语义动作
 * 由于 js 的语法缺陷，如果直接将这些函数成为成员变量，则会有 this 指针指向混乱的情况
 * 所以单列成 58 个函数，作为中间代码生成器类中成员 _allFuncs 数组的成员
 * @param right {Array.<Node>} 产生式右部
 * @param VST {VarTable} 符号表
 * @param FST {FuncTable} 函数表
 * @return {Node}
 */
const f1 = function(right, VST, FST) {
    // S' -> S $ 1
    const S_ = new Node();
    const S = deepCopy(right[0]);

    S_.IR = S.IR;

    return S_;
};

const f2 = function(right, VST, FST) {
    // S -> <Body> $ 2
    const S = new Node();
    const B = deepCopy(right[0]);

    S.IR = B.IR;

    return S;
};

const f3 = function(right, VST, FST) {
    // S -> <Body> S $ 3
    const S1 = new Node();
    const B = deepCopy(right[0]);
    const S2 = deepCopy(right[1]);

    S1.IR += B.IR;
    S1.IR += S2.IR;

    return S1;
};

const f4 = function(right, VST, FST) {
    // <Body> -> <Decl> $ 4
    const B = new Node();
    const D = deepCopy(right[0]);

    B.IR = D.IR;

    return B;
};

const f5 = function(right, VST, FST) {
    // <Decl> -> <VarDecl> $ 5
    const D = new Node();
    const VD = deepCopy(right[0]);

    D.IR = VD.IR;

    return D;
};

const f6 = function(right, VST, FST) {
    // <Decl> -> <FuncDecl> $ 6
    const D = new Node();
    const FD = deepCopy(right[0]);

    D.IR = FD.IR;

    return D;
};

const f7 = function(right, VST, FST) {
    // <VarDecl> -> int ID ; $ 7
    const VD = new Node();
    const ID = deepCopy(right[1]);

    VST.append(ID.val, 'int');

    const newTemp1 = TA.getNewTemp(); // 指针
    const varType = 'i32';
    const storeVal = '0';

    VD.IR += `%${newTemp1} = alloca ${varType}\n`;
    VD.IR += `store ${varType} ${storeVal}, ${varType}* %${newTemp1}\n`;
    VD.IR += `%${ID.val} = load ${varType}, ${varType}* %${newTemp1}\n`;  // 此时 ID.val 中储存着带返回值

    return VD;
};

const f8 = function(right, VST, FST) {
    // <VarDecl> -> int ID = <Exprsn> ; $ 8
    const VD = new Node();
    const ID = deepCopy(right[1]);
    const E = deepCopy(right[3]);

    if(E.valType !== 'int') {
        const errorInfo = 'Assign a value of float to a var of int';
        throw new Error(errorInfo);
    }

    VST.append(ID.val, 'int');

    const newTemp1 = TA.getNewTemp(); // 指针
    const varType = 'i32';
    let storeVal;
    if(hasLetter(E.val)) {
        storeVal = '%' + E.val;
    } else {
        storeVal = E.val;
    }

    VD.IR += E.IR;
    VD.IR += `%${newTemp1} = alloca ${varType}\n`;
    VD.IR += `store ${varType} ${storeVal}, ${varType}* %${newTemp1}\n`;
    VD.IR += `%${ID.val} = load ${varType}, ${varType}* %${newTemp1}\n`;  // 此时 ID.val 中储存着带返回值

    return VD;
};

const f9 = function(right, VST, FST) {
    // <VarDecl> -> float ID ; $ 9
    const VD = new Node();
    const ID = deepCopy(right[1]);

    VST.append(ID.val, 'float');

    const newTemp1 = TA.getNewTemp(); // 指针
    const varType = 'float';
    const storeVal = representFloat('0.0');

    VD.IR += `%${newTemp1} = alloca ${varType}\n`;
    VD.IR += `store ${varType} ${storeVal}, ${varType}* %${newTemp1}\n`;
    VD.IR += `%${ID.val} = load ${varType}, ${varType}* ${newTemp1}\n`;  // 此时 ID.val 中储存着带返回值

    return VD;
};

const f10 = function(right, VST, FST) {
    // <VarDecl> -> float ID = <Exprsn> ; $ 10
    const VD = new Node();
    const ID = deepCopy(right[1]);
    const E = deepCopy(right[3]);

    if(E.valType !== 'float') {
        const errorInfo = 'Assign a value of int to a var of float';
        throw new Error(errorInfo);
    }

    VST.append(ID.val, 'float');

    const newTemp1 = TA.getNewTemp(); // 指针
    const varType = 'float';
    let storeVal;
    if(hasLetter(E.val)) {
        storeVal = '%' + E.val;
    } else {
        storeVal = representFloat(E.val);
    }

    VD.IR += E.IR;
    VD.IR += `%${newTemp1} = alloca ${varType}\n`;
    VD.IR += `store ${varType} ${storeVal}, ${varType}* %${newTemp1}\n`;
    VD.IR += `%${ID.val} = load ${varType}, ${varType}* %${newTemp1}\n`;  // 此时 ID.val 中储存着带返回值

    return VD;
};

const f11 = function(right, VST, FST) {
    // <FuncDecl> -> int ID  ( <FormalParams> ) <StmtBlock> $ 11
    if(SB.returnType !== 'int') {
        const errorInfo = 'Return type differs from function declaration';
        throw new Error(errorInfo);
    }

    FD.IR += `define int @${ID.val}(${FP.IR}) {\n`;
    FD.IR += SB.IR;
    FD.IR += `}\n`;
    FST.append(ID.val, 'int', FP.paramType, FP.paramName);

    return FD;
};

const f12 = function(right, VST, FST) {
    // <FuncDecl> -> float ID  ( <FormalParams> ) <StmtBlock> $ 12
    const FD = new Node();
    const ID = deepCopy(right[1]);
    const FP = deepCopy(right[3]);
    const SB = deepCopy(right[5]);

    if(SB.returnType !== 'float') {
        const errorInfo = 'Return type differs from function declaration';
        throw new Error(errorInfo);
    }
    FD.IR += `define float @${ID.val}(${FP.IR}) {\n`;
    FD.IR += SB.IR;
    FD.IR += `}\n`;
    FST.append(ID.val, 'float', FP.paramType, FP.paramName);

    return FD;
};

const f13 = function(right, VST, FST) {
    // <FuncDecl> -> void ID  ( <FormalParams> ) <StmtBlock> $ 13
    const FD = new Node();
    const ID = deepCopy(right[1]);
    const FP = deepCopy(right[3]);
    const SB = deepCopy(right[5]);

    if(SB.returnType !== 'void') {
        const errorInfo = 'Return type differs from function declaration';
        throw new Error(errorInfo);
    }
    FD.IR += `define void @${ID.val}(${FP.IR}) {\n`;
    FD.IR += SB.IR;
    FD.IR += `}\n`;
    FST.append(ID.val, 'void', FP.paramType, FP.paramName);

    return FD;
};

const f14 = function(right, VST, FST) {
    // <FormalParams> -> <ParamList> $ 14
    const FP = new Node();
    const P = deepCopy(right[0]);

    FP.paramName = P.paramName;
    FP.paramType = P.paramType;
    FP.IR = P.IR;

    return FP;
};

const f15 = function(right, VST, FST) {
    // <FormalParams> -> void $ 15
    const FP = new Node();
    return FP;
};

const f16 = function(right, VST, FST) {
    // <FormalParams> -> ε $ 16
    const FP = new Node();
    return FP;
};

const f17 = function(right, VST, FST) {
    // <ParamList> -> <Param> $ 17
    const PL = new Node();
    const P = deepCopy(right[0]);

    PL.paramName.unshift(P.paramName[0]);
    PL.paramType.unshift(P.paramType[0]);
    PL.IR = P.IR;

    return PL;
};

const f18 = function(right, VST, FST) {
    // <ParamList> -> <Param> , <ParamList> $ 18
    const PL1 = new Node();
    const P = deepCopy(right[0]);
    const PL2 = deepCopy(right[2]);

    PL1.paramType = PL2.paramType;
    PL1.paramName = PL2.paramName;
    PL1.paramType.unshift(P.paramType[0]);
    PL1.paramName.unshift(P.paramName[0]);

    PL1.IR = P.IR + ', ' + PL2.IR;

    return PL1;
};

const f19 = function(right, VST, FST) {
    // <Param> -> int ID $ 19
    const P = new Node();
    const ID = deepCopy(right[1]);

    P.paramType.unshift('int');
    P.paramName.unshift(ID.val);
    P.IR = `i32 %${ID}`;

    return P;
};

const f20 = function(right, VST, FST) {
    // <Param> -> float ID $ 20
    const P = new Node();
    const ID = deepCopy(right[1]);

    P.paramType = 'float';
    P.paramName = ID.val;
    P.IR = `float %${ID}`;

    return P;
};

const f21 = function(right, VST, FST) {
    // <StmtBlock> -> { <Stmts> } $ 21
    const SB = new Node();
    const S = deepCopy(right[1]);

    SB.IR = S.IR;
    SB.returnType = S.returnType;
    for(let i = 0; i < S.innerVarAmount; i++) {
        VST.remove(); //离开一个语句块时，将块内声明的变量全部从符号表中移除
    }

    return SB;
};

const f22 = function(right, VST, FST) {
    // <Stmts> -> <Stmt> <Stmts> $ 22
    const Ss1 = new Node();
    const S = deepCopy(right[0]);
    const Ss2 = deepCopy(right[1]);

    if(S.returnType !== Ss2.returnType) {
        const errorInfo = 'Can\'t return values of different types in a function';
        throw new Error(errorInfo);
    }

    Ss1.IR = S.IR + Ss2.IR;
    Ss1.returnType = S.returnType;
    Ss1.innerVarAmount = S.innerVarAmount + Ss2.innerVarAmount;

    return Ss1;
};

const f23 = function(right, VST, FST) {
    // <Stmts> -> <Stmt> $ 23
    const Ss = new Node();
    const S = deepCopy(right[0]);

    Ss.IR = S.IR;
    Ss.returnType = S.returnType;
    Ss.innerVarAmount = S.innerVarAmount;

    return Ss;
};

const f24 = function(right, VST, FST) {
    // <Stmt> -> <VarDecl> $ 24
    const S = new Node();
    const VD = deepCopy(right[0]);

    S.IR = VD.IR;
    S.returnType = 'void';
    S.innerVarAmount++;

    return S;
};

const f25 = function(right, VST, FST) {
    // <Stmt> -> <IfStmt> $ 25
    const S = new Node();
    const IS = deepCopy(right[0]);

    S.IR = IS.IR;
    S.returnType = IS.returnType;

    return S;
};

const f26 = function(right, VST, FST) {
    // <Stmt> -> <WhileStmt> $ 26
    const S = new Node();
    const WS = deepCopy(right[0]);

    S.IR = WS.IR;
    S.returnType = WS.returnType;

    return S;
};

const f27 = function(right, VST, FST) {
    // <Stmt> -> <ReturnStmt> $ 27
    const S = new Node();
    const RS = deepCopy(right[0]);

    S.IR = RS.IR;
    S.returnType = RS.returnType;

    return S;
};

const f28 = function(right, VST, FST) {
    // <Stmt> -> <AssignStmt> $ 28
    const S = new Node();
    const AS = deepCopy(right[0]);

    S.IR = AS.IR;
    S.returnType = 'void';

    return S;
};

const f29 = function(right, VST, FST) {
    // <AssignStmt> -> ID = <Exprsn> ; $ 29
    const A = new Node();
    const ID = deepCopy(right[0]);
    const E = deepCopy(right[2]);

    if(!VST.hasVar(ID.val)) {
        const errorInfo = 'Use a var without declaration';
        throw new Error(errorInfo);
    }
    if(VST.getVarType(ID.val) !== E.valType) {
        const errorInfo = 'Can\'t assign to a var of different type';
        throw new Error(errorInfo);
    }
    // 至此变量检查结束
    
    const newTemp1 = TA.getNewTemp(); // 指针
    const newTemp2 = TA.getNewTemp();
    const varType = (E.valType === 'int')? 'i32': 'float';
    let storeVal;
    if(hasLetter(E.val)) {
        storeVal = '%' + E.val;
    } else {
        storeVal = (E.valType === 'int')? E.val: representFloat(E.val);
    }

    A.IR += E.IR;
    A.IR += `%${newTemp1} = alloca ${varType}\n`;
    A.IR += `store ${varType} ${storeVal}, ${varType}* %${newTemp1}\n`;
    A.IR += `%${newTemp2} = load ${varType}, ${varType}* %${newTemp1}\n`;  // 此时 newTemp2 中储存着带返回值
    A.IR += `ret ${varType} ${newTemp2}\n`; 

    return A;
};

const f30 = function(right, VST, FST) {
    // <ReturnStmt> -> return <Exprsn> ; $ 30
    const RS = new Node();
    const E = deepCopy(right[1]);

    RS.returnType = E.valType;
    let rtValue;
    if(E.valType === 'int') {
        rtValue = 'i32 ' + (hasLetter(E.val)? `%${E.val}`: E.val);
    } else {
        rtValue = 'float ' + (hasLetter(E.val)? `%${E.val}`: representFloat(E.val));
    }
    RS.IR = 'ret ' + rtValue + '\n';

    return RS;
};

const f31 = function(right, VST, FST) {
    // <ReturnStmt> -> return ; $ 31
    const RS = new Node();

    RS.returnType = 'void';
    RS.IR = 'ret void\n';

    return RS;
};

const f32 = function(right, VST, FST) {
    // <WhileStmt> -> while ( <Exprsn> ) <StmtBlock> $ 32
    const WS = new Node();
    const E = deepCopy(right[2]);
    const SB = deepCopy(right[4]);

    if(E.valType !== 'int') {
        const errorInfo = 'If branch condition must be of int';
        throw new Error(errorInfo);
    }
    // 类型检查通过
    WS.returnType = SB.returnType;   
    
    const newTemp1 = TA.getNewTemp(); // i1 
    const newLabel1 = LA.getNewLabel();
    const newLabel2 = LA.getNewLabel();
    const newLabel3 = LA.getNewLabel();

    WS.IR += E.IR;
    WS.IR += `${newLabel1}:\n`; 
    WS.IR += `%${newTemp1} = icmp eq i32 ${hasLetter(E.val)? ('%' + E.val): E.val}, 1\n`;
    WS.IR += `br i1 %${newTemp1}, label %${newLabel2}, label %${newLabel3}\n`;
    WS.IR += `${newLabel2}:\n`;
    WS.IR += SB.IR;
    WS.IR += `br label %${newLabel1}\n`;
    WS.IR += `${newLabel3}:\n`;

    return WS;
};

const f33 = function(right, VST, FST) {
    // <IfStmt> -> if ( <Exprsn> ) <StmtBlock> else <StmtBlock> $ 33
    const IS = new Node();
    const E = deepCopy(right[2]);
    const SB1 = deepCopy(right[4]);
    const SB2 = deepCopy(right[6]);

    if(SB1.returnType !== SB2.returnType) {
        const errorInfo = 'The values returnd have different types';
        throw new Error(errorInfo);
    }
    if(E.valType !== 'int') {
        const errorInfo = 'If branch condition must be of int';
        throw new Error(errorInfo);
    }
    // 类型检查通过
    IS.returnType = SB1.returnType;

    const newTemp1 = TA.getNewTemp(); // i1 
    const newLabel1 = LA.getNewLabel();
    const newLabel2 = LA.getNewLabel();
    const newLabel3 = LA.getNewLabel();

    IS.IR += E.IR;
    IS.IR += `%${newTemp1} = icmp eq i32 ${hasLetter(E.val)? ('%' + E.val): E.val}, 1\n`;
    IS.IR += `br i1 %${newTemp1}, label %${newLabel1}, label %${newLabel2}\n`;
    IS.IR += `${newLabel1}:\n`;
    IS.IR += SB1.IR;
    IS.IR += `br label %${newLabel3}\n`;
    IS.IR += `${newLabel2}:\n`;
    IS.IR += SB2.IR;
    IS.IR += `${newLabel3}:\n`;

    return IS;
};

const f34 = function(right, VST, FST) {
    // <IfStmt> -> if ( <Exprsn> ) <StmtBlock> $ 34
    const IS = new Node();
    const E = deepCopy(right[2]);
    const SB = deepCopy(right[4]);

    if(E.valType !== 'int') {
        const errorInfo = 'If branch condition must be of int';
        throw new Error(errorInfo);
    }
    // 类型检查通过

    IS.returnType = SB.returnType;
    // for(let i = 0; i < SB.innerVarAmount; i++) {
    //     // 离开一个语句块时，将其中声明的变量从符号表中移除
    //     VST.remove();
    // }

    const newTemp1 = TA.getNewTemp(); // i1 
    const newLabel1 = LA.getNewLabel();
    const newLabel2 = LA.getNewLabel();

    IS.IR += E.IR;
    IS.IR += `%${newTemp1} = icmp eq i32 ${hasLetter(E.val)? ('%' + E.val): E.val}, 1\n`;
    IS.IR += `br i1 %${newTemp1}, label %${newLabel1}, label %${newLabel2}\n`;
    IS.IR += `${newLabel1}:\n`;
    IS.IR += SB.IR;
    IS.IR += `${newLabel2}:\n`;

    return IS;
};

const f35 = function(right, VST, FST) {
    // <Exprsn> -> <AddExprsn> $ 35
    const E = new Node();
    const A = deepCopy(right[0]);

    E.val = A.val;
    E.valType = A.valType;
    E.IR = A.IR;

    return E;
};

const f36 = function(right, VST, FST) {
    // <Exprsn> -> <AddExprsn> < <Exprsn> $ 36
    const E1 = new Node();
    const A = deepCopy(right[0]);
    const E2 = deepCopy(right[2]);

    if(A.valType !== E2.valType) {
        const errorInfo = 'Two operands have different type';
        throw new Error(errorInfo);
    }
    // 运算数类型检查通过

    const newTemp1 = TA.getNewTemp(); // i1 类型的比较结果
    const newTemp2 = TA.getNewTemp(); // i32*
    const newTemp3 = TA.getNewTemp(); // i32
    const newLabel1 = LA.getNewLabel();
    const newLabel2 = LA.getNewLabel();
    const newLabel3 = LA.getNewLabel();

    E1.valType = 'int';
    E1.val = newTemp3;

    const opName = (A.valType === 'int')? 'icmp slt': 'fcmp olt';
    let opr1, opr2;
    if(A.valType === 'int') {
        opr1 = 'i32 ' + ((hasLetter(I.val))? `%${F.val}`: F.val);
        opr2 = (hasLetter(A2.val))? `%${I2.val}`: I2.val;
    } else {
        opr1 = 'float ' + ((hasLetter(I.val))? `%${F.val}`: representFloat(F.val));
        opr2 = (hasLetter(A2.val))? `%${I2.val}`: representFloat(I2.val);
    }
    
    E1.IR += A.IR;
    E1.IR += E2.IR;
    E1.IR += `%${newTemp1} = ${opName} ${opr1}, ${opr2}\n`;
    E1.IR += `%${newTemp2} = alloca i32`; // 得到一个 i32 类型的指针
    E1.IR += `br i1 %${newTemp1}, label %${newLabel1}, label %${newLabel2}\n`;
    E1.IR += `${newLabel1}:\n`;
    E1.IR += `store i32 1, i32* %${newTemp2}\n`; // 结果为 1
    E1.IR += `br label %${newLabel3}\n`;
    E1.IR += `${newLabel2}:\n`;
    E1.IR += `store i32 0, i32* %${newTemp2}\n`; // 结果为 0
    E1.IR += `${newLabel3}:\n`;
    E1.IR += `%${newTemp3} = load i32, i32* %${newTemp2}\n`; // 从 i32* 的指针指向的地址中取值并且赋给 nT3

    return E1;
};

const f37 = function(right, VST, FST) {
    // <Exprsn> -> <AddExprsn> <= <Exprsn> $ 37
    const E1 = new Node();
    const A = deepCopy(right[0]);
    const E2 = deepCopy(right[2]);

    if(A.valType !== E2.valType) {
        const errorInfo = 'Two operands have different type';
        throw new Error(errorInfo);
    }
    // 运算数类型检查通过

    const newTemp1 = TA.getNewTemp(); // i1 类型的比较结果
    const newTemp2 = TA.getNewTemp(); // i32*
    const newTemp3 = TA.getNewTemp(); // i32
    const newLabel1 = LA.getNewLabel();
    const newLabel2 = LA.getNewLabel();
    const newLabel3 = LA.getNewLabel();

    E1.valType = 'int';
    E1.val = newTemp3;

    const opName = (A.valType === 'int')? 'icmp sle': 'fcmp ole';
    let opr1, opr2;
    if(A.valType === 'int') {
        opr1 = 'i32 ' + ((hasLetter(I.val))? `%${F.val}`: F.val);
        opr2 = (hasLetter(A2.val))? `%${I2.val}`: I2.val;
    } else {
        opr1 = 'float ' + ((hasLetter(I.val))? `%${F.val}`: representFloat(F.val));
        opr2 = (hasLetter(A2.val))? `%${I2.val}`: representFloat(I2.val);
    }
    
    E1.IR += A.IR;
    E1.IR += E2.IR;
    E1.IR += `%${newTemp1} = ${opName} ${opr1}, ${opr2}\n`;
    E1.IR += `%${newTemp2} = alloca i32`; // 得到一个 i32 类型的指针
    E1.IR += `br i1 %${newTemp1}, label %${newLabel1}, label %${newLabel2}\n`;
    E1.IR += `${newLabel1}:\n`;
    E1.IR += `store i32 1, i32* %${newTemp2}\n`; // 结果为 1
    E1.IR += `br label %${newLabel3}\n`;
    E1.IR += `${newLabel2}:\n`;
    E1.IR += `store i32 0, i32* %${newTemp2}\n`; // 结果为 0
    E1.IR += `${newLabel3}:\n`;
    E1.IR += `%${newTemp3} = load i32, i32* %${newTemp2}\n`; // 从 i32* 的指针指向的地址中取值并且赋给 nT3

    return E1;
};

const f38 = function(right, VST, FST) {
    // <Exprsn> -> <AddExprsn> > <Exprsn> $ 38
    const E1 = new Node();
    const A = deepCopy(right[0]);
    const E2 = deepCopy(right[2]);

    if(A.valType !== E2.valType) {
        const errorInfo = 'Two operands have different type';
        throw new Error(errorInfo);
    }
    // 运算数类型检查通过

    const newTemp1 = TA.getNewTemp(); // i1 类型的比较结果
    const newTemp2 = TA.getNewTemp(); // i32*
    const newTemp3 = TA.getNewTemp(); // i32
    const newLabel1 = LA.getNewLabel();
    const newLabel2 = LA.getNewLabel();
    const newLabel3 = LA.getNewLabel();

    E1.valType = 'int';
    E1.val = newTemp3;

    const opName = (A.valType === 'int')? 'icmp sgt': 'fcmp ogt';
    let opr1, opr2;
    if(A.valType === 'int') {
        opr1 = 'i32 ' + ((hasLetter(I.val))? `%${F.val}`: F.val);
        opr2 = (hasLetter(A2.val))? `%${I2.val}`: I2.val;
    } else {
        opr1 = 'float ' + ((hasLetter(I.val))? `%${F.val}`: representFloat(F.val));
        opr2 = (hasLetter(A2.val))? `%${I2.val}`: representFloat(I2.val);
    }
    
    E1.IR += A.IR;
    E1.IR += E2.IR;
    E1.IR += `%${newTemp1} = ${opName} ${opr1}, ${opr2}\n`;
    E1.IR += `%${newTemp2} = alloca i32`; // 得到一个 i32 类型的指针
    E1.IR += `br i1 %${newTemp1}, label %${newLabel1}, label %${newLabel2}\n`;
    E1.IR += `${newLabel1}:\n`;
    E1.IR += `store i32 1, i32* %${newTemp2}\n`; // 结果为 1
    E1.IR += `br label %${newLabel3}\n`;
    E1.IR += `${newLabel2}:\n`;
    E1.IR += `store i32 0, i32* %${newTemp2}\n`; // 结果为 0
    E1.IR += `${newLabel3}:\n`;
    E1.IR += `%${newTemp3} = load i32, i32* %${newTemp2}\n`; // 从 i32* 的指针指向的地址中取值并且赋给 nT3

    return E1;
};

const f39 = function(right, VST, FST) {
    // <Exprsn> -> <AddExprsn> >= <Exprsn> $ 39
    const E1 = new Node();
    const A = deepCopy(right[0]);
    const E2 = deepCopy(right[2]);

    if(A.valType !== E2.valType) {
        const errorInfo = 'Two operands have different type';
        throw new Error(errorInfo);
    }
    // 运算数类型检查通过

    const newTemp1 = TA.getNewTemp(); // i1 类型的比较结果
    const newTemp2 = TA.getNewTemp(); // i32*
    const newTemp3 = TA.getNewTemp(); // i32
    const newLabel1 = LA.getNewLabel();
    const newLabel2 = LA.getNewLabel();
    const newLabel3 = LA.getNewLabel();

    E1.valType = 'int';
    E1.val = newTemp3;

    const opName = (A.valType === 'int')? 'icmp sge': 'fcmp oge';
    let opr1, opr2;
    if(A.valType === 'int') {
        opr1 = 'i32 ' + ((hasLetter(I.val))? `%${F.val}`: F.val);
        opr2 = (hasLetter(A2.val))? `%${I2.val}`: I2.val;
    } else {
        opr1 = 'float ' + ((hasLetter(I.val))? `%${F.val}`: representFloat(F.val));
        opr2 = (hasLetter(A2.val))? `%${I2.val}`: representFloat(I2.val);
    }
    
    E1.IR += A.IR;
    E1.IR += E2.IR;
    E1.IR += `%${newTemp1} = ${opName} ${opr1}, ${opr2}\n`;
    E1.IR += `%${newTemp2} = alloca i32`; // 得到一个 i32 类型的指针
    E1.IR += `br i1 %${newTemp1}, label %${newLabel1}, label %${newLabel2}\n`;
    E1.IR += `${newLabel1}:\n`;
    E1.IR += `store i32 1, i32* %${newTemp2}\n`; // 结果为 1
    E1.IR += `br label %${newLabel3}\n`;
    E1.IR += `${newLabel2}:\n`;
    E1.IR += `store i32 0, i32* %${newTemp2}\n`; // 结果为 0
    E1.IR += `${newLabel3}:\n`;
    E1.IR += `%${newTemp3} = load i32, i32* %${newTemp2}\n`; // 从 i32* 的指针指向的地址中取值并且赋给 nT3

    return E1;
};

const f40 = function(right, VST, FST) {
    // <Exprsn> -> <AddExprsn> == <Exprsn> $ 40
    const E1 = new Node();
    const A = deepCopy(right[0]);
    const E2 = deepCopy(right[2]);

    if(A.valType !== E2.valType) {
        const errorInfo = 'Two operands have different type';
        throw new Error(errorInfo);
    }
    // 运算数类型检查通过

    const newTemp1 = TA.getNewTemp(); // i1 类型的比较结果
    const newTemp2 = TA.getNewTemp(); // i32*
    const newTemp3 = TA.getNewTemp(); // i32
    const newLabel1 = LA.getNewLabel();
    const newLabel2 = LA.getNewLabel();
    const newLabel3 = LA.getNewLabel();

    E1.valType = 'int';
    E1.val = newTemp3;

    const opName = (A.valType === 'int')? 'icmp eq': 'fcmp oeq';
    let opr1, opr2;
    if(A.valType === 'int') {
        opr1 = 'i32 ' + ((hasLetter(I.val))? `%${F.val}`: F.val);
        opr2 = (hasLetter(A2.val))? `%${I2.val}`: I2.val;
    } else {
        opr1 = 'float ' + ((hasLetter(I.val))? `%${F.val}`: representFloat(F.val));
        opr2 = (hasLetter(A2.val))? `%${I2.val}`: representFloat(I2.val);
    }
    
    E1.IR += A.IR;
    E1.IR += E2.IR;
    E1.IR += `%${newTemp1} = ${opName} ${opr1}, ${opr2}\n`;
    E1.IR += `%${newTemp2} = alloca i32`; // 得到一个 i32 类型的指针
    E1.IR += `br i1 %${newTemp1}, label %${newLabel1}, label %${newLabel2}\n`;
    E1.IR += `${newLabel1}:\n`;
    E1.IR += `store i32 1, i32* %${newTemp2}\n`; // 结果为 1
    E1.IR += `br label %${newLabel3}\n`;
    E1.IR += `${newLabel2}:\n`;
    E1.IR += `store i32 0, i32* %${newTemp2}\n`; // 结果为 0
    E1.IR += `${newLabel3}:\n`;
    E1.IR += `%${newTemp3} = load i32, i32* %${newTemp2}\n`; // 从 i32* 的指针指向的地址中取值并且赋给 nT3

    return E1;
};

const f41 = function(right, VST, FST) {
    // <Exprsn> -> <AddExprsn> != <Exprsn> $ 41
    const E1 = new Node();
    const A = deepCopy(right[0]);
    const E2 = deepCopy(right[2]);

    if(A.valType !== E2.valType) {
        const errorInfo = 'Two operands have different type';
        throw new Error(errorInfo);
    }
    // 运算数类型检查通过

    const newTemp1 = TA.getNewTemp(); // i1 类型的比较结果
    const newTemp2 = TA.getNewTemp(); // i32*
    const newTemp3 = TA.getNewTemp(); // i32
    const newLabel1 = LA.getNewLabel();
    const newLabel2 = LA.getNewLabel();
    const newLabel3 = LA.getNewLabel();

    E1.valType = 'int';
    E1.val = newTemp3;

    const opName = (A.valType === 'int')? 'icmp ne': 'fcmp une';
    let opr1, opr2;
    if(A.valType === 'int') {
        opr1 = 'i32 ' + ((hasLetter(I.val))? `%${F.val}`: F.val);
        opr2 = (hasLetter(A2.val))? `%${I2.val}`: I2.val;
    } else {
        opr1 = 'float ' + ((hasLetter(I.val))? `%${F.val}`: representFloat(F.val));
        opr2 = (hasLetter(A2.val))? `%${I2.val}`: representFloat(I2.val);
    }
    
    E1.IR += A.IR;
    E1.IR += E2.IR;
    E1.IR += `%${newTemp1} = ${opName} ${opr1}, ${opr2}\n`;
    E1.IR += `%${newTemp2} = alloca i32`; // 得到一个 i32 类型的指针
    E1.IR += `br i1 %${newTemp1}, label %${newLabel1}, label %${newLabel2}\n`;
    E1.IR += `${newLabel1}:\n`;
    E1.IR += `store i32 1, i32* %${newTemp2}\n`; // 结果为 1
    E1.IR += `br label %${newLabel3}\n`;
    E1.IR += `${newLabel2}:\n`;
    E1.IR += `store i32 0, i32* %${newTemp2}\n`; // 结果为 0
    E1.IR += `${newLabel3}:\n`;
    E1.IR += `%${newTemp3} = load i32, i32* %${newTemp2}\n`; // 从 i32* 的指针指向的地址中取值并且赋给 nT3

    return E1;
};

const f42 = function(right, VST, FST) {
    // <AddExprsn> -> <Item> + <AddExprsn> $ 42
    const A1 = new Node();
    const I = deepCopy(right[0]);
    const A2 = deepCopy(right[2]);

    if(I.valType !== A2.valType) {
        const errorInfo = 'Two operands have different type';
        throw new Error(errorInfo);
    }
    // 运算数类型检查通过
    const newTemp = TA.getNewTemp();

    A1.valType = I.valType;
    A1.val = newTemp;
    A1.IR += I.IR;
    A1.IR += A2.IR;

    const opName = (A1.valType === 'int')? 'add': 'fadd';
    const oprType = (A1.valType === 'int')? 'i32': 'float';
    let opr1, opr2;
    if(F.valType === 'int') {
        opr1 = (hasLetter(I.val))? `%${I.val}`: I.val;
    } else {
        opr1 = (hasLetter(I.val))? `%${I.val}`: representFloat(I.val);
    }
    if(I2.valType === 'int') {
        opr2 = (hasLetter(A2.val))? `%${A2.val}`: A2.val;
    } else {
        opr2 = (hasLetter(A2.val))? `%${A2.val}`: representFloat(A2.val);
    }

    A1.IR += `%${newTemp} = ${opName} ${oprType} ${opr1}, ${oprType} ${opr2}\n`;

    return A1;
};

const f43 = function(right, VST, FST) {
    // <AddExprsn> -> <Item> - <AddExprsn> $ 43
    const A1 = new Node();
    const I = deepCopy(right[0]);
    const A2 = deepCopy(right[2]);

    if(I.valType !== A2.valType) {
        const errorInfo = 'Two operands have different type';
        throw new Error(errorInfo);
    }
    // 运算数类型检查通过
    const newTemp = TA.getNewTemp();

    A1.valType = I.valType;
    A1.val = newTemp;
    A1.IR += I.IR;
    A1.IR += A2.IR;

    const opName = (A1.valType === 'int')? 'sub': 'fsub';
    const oprType = (A1.valType === 'int')? 'i32': 'float';
    let opr1, opr2;
    if(F.valType === 'int') {
        opr1 = (hasLetter(I.val))? `%${I.val}`: I.val;
    } else {
        opr1 = (hasLetter(I.val))? `%${I.val}`: representFloat(I.val);
    }
    if(I2.valType === 'int') {
        opr2 = (hasLetter(A2.val))? `%${A2.val}`: A2.val;
    } else {
        opr2 = (hasLetter(A2.val))? `%${A2.val}`: representFloat(A2.val);
    }

    A1.IR += `%${newTemp} = ${opName} ${oprType} ${opr1}, ${oprType} ${opr2}\n`;

    return A1;
};

const f44 = function(right, VST, FST) {
    // <AddExprsn> -> <Item> $ 44
    const A = new Node();
    const I = deepCopy(right[0]);

    A.val = I.val;
    A.valType = I.valType;
    A.IR = I.IR;

    return A;
};

const f45 = function(right, VST, FST) {
    // <Item> -> <Factor> * <Item> $ 45
    const I1 = new Node();
    const F = deepCopy(right[0]);
    const I2 = deepCopy(right[2]);

    if(F.valType !== I2.valType) {
        const errorInfo = 'Two operands have different type';
        throw new Error(errorInfo);
    }
    // 运算数类型检查通过
    const newTemp = TA.getNewTemp();

    I1.valType = F.valType;
    I1.val = newTemp;
    I1.IR += F.IR;
    I1.IR += I2.IR;

    const opName = (I1.valType === 'int')? 'mul': 'fmul';
    const oprType = (I1.valType === 'int')? 'i32': 'float';
    let opr1, opr2;
    if(F.valType === 'int') {
        opr1 = (hasLetter(F.val))? `%${F.val}`: F.val;
    } else {
        opr1 = (hasLetter(F.val))? `%${F.val}`: representFloat(F.val);
    }
    if(I2.valType === 'int') {
        opr2 = (hasLetter(I2.val))? `%${I2.val}`: I2.val;
    } else {
        opr2 = (hasLetter(I2.val))? `%${I2.val}`: representFloat(I2.val);
    }

    I1.IR += `%${newTemp} = ${opName} ${oprType} ${opr1}, ${oprType} ${opr2}\n`;

    return I1;
};

const f46 = function(right, VST, FST) {
    // <Item> -> <Factor> / <Item> $ 46
    const I1 = new Node();
    const F = deepCopy(right[0]);
    const I2 = deepCopy(right[2]);

    if(F.valType !== I2.valType) {
        const errorInfo = 'Two operands have different type';
        throw new Error(errorInfo);
    }
    // 运算数类型检查通过
    const newTemp = TA.getNewTemp();

    I1.valType = F.valType;
    I1.val = newTemp;
    I1.IR += F.IR;
    I1.IR += I2.IR;

    const opName = (I1.valType === 'int')? 'sdiv': 'fdiv';
    const oprType = (I1.valType === 'int')? 'i32': 'float';
    let opr1, opr2;
    if(F.valType === 'int') {
        opr1 = (hasLetter(F.val))? `%${F.val}`: F.val;
    } else {
        opr1 = (hasLetter(F.val))? `%${F.val}`: representFloat(F.val);
    }
    if(I2.valType === 'int') {
        opr2 = (hasLetter(I2.val))? `%${I2.val}`: I2.val;
    } else {
        opr2 = (hasLetter(I2.val))? `%${I2.val}`: representFloat(I2.val);
    }

    I1.IR += `%${newTemp} = ${opName} ${oprType} ${opr1}, ${oprType} ${opr2}\n`;

    return I1;
};

const f47 = function(right, VST, FST) {
    // <Item> -> <Factor> $ 47
    const I = new Node();
    const F = deepCopy(right[0]);

    I.val = F.val;
    I.valType = F.valType;
    I.IR = F.IR;

    return I;
};

const f48 = function(right, VST, FST) {
    // <Factor> -> inum $ 48
    const F = new Node();
    const inum = deepCopy(right[0]);

    F.val = inum.val;
    F.valType = 'int';

    return F;
};

const f49 = function(right, VST, FST) {
    // <Factor> -> fnum $ 49
    const F = new Node();
    const fnum = deepCopy(right[0]);

    F.val = fnum.val;
    F.valType = 'float';

    return F;
};

const f50 = function(right, VST, FST) {
    // <Factor> -> ( <Exprsn> ) $ 50
    const F = new Node();
    const E = deepCopy(right[1]);

    F.val = E.val;
    F.valType = E.valType;
    F.IR = E.IR;

    return F;
};

const f51 = function(right, VST, FST) {
	// <Factor> -> ID $ 51
    const F = new Node();
    const ID = deepCopy(right[0]);
    
    if(!VST.hasVar(ID.val)) {
        const errorInfo = 'Use a var without declaration';
        throw new Error(errorInfo);
    }
    // 至此变量检查结束

    F.val = ID.val;
    F.valType = VST.getVarType(ID.val);

    return F;
};

const f52 = function(right, VST, FST) {
	// <Factor> -> ID <FuncCall> $ 52
	const F = new Node();
	const ID = deepCopy(right[0]);
	const FC = deepCopy(right[1]);

	if(!FST.hasFunc(ID.val, FC.argType)) {
        const errorInfo = 'Function parameter type don\'t match';
        throw new Error(errorInfo);
    }
    // 至此通过函数参数类型检查
    const funcReturnType = FST.getReturnType(ID.val);
    if(funcReturnType === 'void') {
        const errorInfo = 'Call a function which returns void';
        throw new Error(errorInfo);
    }
    // 通过函数返回值类型检查
    const newTemp = TA.getNewTemp();
    F.val = newTemp;
    F.valType = funcReturnType;

    F.IR = FC.IR;
    F.IR += `%${newTemp} = call ${(funcReturnType === 'int')? 'i32': 'float'} @${ID.val}(`;
    for(let i = 0; i < F.args.length; i++) {
        if(i !== 0) {
            F.IR += ', ';
        }
        const argName = F.args[i];
        const argType = F.argType[i];

        F.IR += (argType === 'int')? 'i32': 'float';

        if(hasLetter(argName)) {
            F.IR += ` %${argName}`;
        } else {
            F.IR += ` ${(argType === 'int')? argName: representFloat(argName)}`;
        }
    }
    F.IR += ')\n';

    return F;
};

const f53 = function(right, VST, FST) {
	// <FuncCall> -> ( <ActualArgs> ) $ 53
	const F = new Node();
	const Ac = deepCopy(right[1]);

	F.args = Ac.args;
    F.argType = Ac.argType;
    F.IR = Ac.IR;

	return F;
};

const f54 = function(right, VST, FST) {
	// <ActualArgs> -> <ArgList> $ 54
	const Ac = new Node();
	const Arg = deepCopy(right[0]);

	Ac.args = Arg.args;
    Ac.argType = Arg.argType;
    Ac.IR = Arg.IR;

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
    A1.IR = E.IR + A2.IR;
	
	return A1;
};

const f58 = function(right, VST, FST) {
    // <ArgList> -> <Exprsn> $ 58
	const A = new Node();
	const E = deepCopy(right[0]);

	A.args.unshift(E.val);
    A.argType.unshift(E.valType);
    A.IR = E.IR;

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
        this._funcTable = new FuncTable();

        /**
         * 变量表
         * @private
         * @type {Object}
         */
        this._varTable = new VarTable();

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

        this._initialize();
    }
}

/**
 * 初始化函数，将 f1 - f58 加入 this.allFuncs 中
 * @private
 */
IR_Generator.prototype._initialize = function() {
    for(let i = 1; i <= 58; i++) {
        const code = `this._allFuncs[${i}] = f${i};`;
        eval(code); // 执行上述代码
    }
};

/**
 * 根据传入的 Record 对象，选取本次规约应当使用的语义分析和处理函数
 * @private
 * @param {Record} record 
 * @return {Function} 返回应该执行的处理函数
 */
IR_Generator.prototype._getFunc = function(record) {
    const pLeft = record.productionLeft;
    const pRight = record.productionRight;

    let key = pLeft;
    for(let each of pRight) {
        key += ' ';
        key += each;
    }
    const pNo = this._prodNo[key];
    const f = this._allFuncs[pNo];

    // console.log(f);
    return f;
};

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
 * 根据传入的 Record 对象，进行一次语义分析操作
 * @public
 * @param {Object} record
 */
IR_Generator.prototype.analyze = function(record) {
    if(record.parseResult[0] === 's') {
        console.log('line: ' + record.lineNum + 'shift in\n');
        const N = new Node();
        N.name = record.symbolName;
        N.val = record.tokenValue;
        this._topNodes.push(N);
    } else if(record.parseResult[0] === 'r') {
        console.log('line: ' + record.lineNum + 'reduce');
        console.log(record.productionLeft + ' -> ' + record.productionRight)
        const f = this._getFunc(record); // 得到语义分析函数

        const rightNodes = new Array();
        const rightAmount = record.productionRight.length; //产生式右部的符号个数
        for(let i = 0; i < rightAmount; i++) {
            const tN = this._topNodes.pop();
            rightNodes.unshift(tN);
        }
        // 此时得到所有待规约符号

        const leftNode = f(rightNodes, this._varTable, this._funcTable);
        console.log(leftNode);
        console.log();
        this._topNodes.push(leftNode);
    } else if(record.parseResult === 'acc') {
        console.log('acc');
        console.log(this._topNodes[0].IR);
    } else if(record.parseResult === 'error') {
        console.log('error');

    } else {

    }
};


// const IR = new IR_Generator();
// IR.readProdNoFile();
// const x = IR._allFuncs[51];
// x();

module.exports = IR_Generator;