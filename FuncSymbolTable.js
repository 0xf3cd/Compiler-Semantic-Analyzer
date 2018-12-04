// 函数符号表类

/**
 * 函数符号表内的项
 * @class
 */
class FuncItem {
    constructor() {
        /**
         * 函数名
         * @public
         * @type {string}
         */
        this.funcName = null;

        /**
         * 返回值类型
         * @public
         * @type {string}
         */
        this.returnType = null;

        /**
         * 参数类型
         * @public
         * @type {Array.<string>}
         */
        this.paramType = new Array();

        /**
         * 参数名
         * @public
         * @type {Array.<string>}
         */
        this.paramName = new Array();
    }
}

/**
 * 函数符号表类，用于记录函数的细节
 * @class
 */
class FuncSymbolTable {
    constructor() {
        /**
         * 储存表项的表格
         * @private
         * @type {Array.<FuncItem>}
         */
        this._table = new Array();
    }
}

/**
 * 检查函数表中是否有对应的函数
 * @public
 * @param funcName {string} 函数名
 * @param returnType {string} 返回值类型
 * @param paramType {Array.<string>} 函数参数类型数组
 * @return {boolean} 
 */
FuncSymbolTable.prototype.hasFunc = function(funcName, returnType, paramType) {
    for(let i = 0; i < this._table.length; i++) { // 遍历函数表
        const each = this._table[i];
        let isTypeSame = true;

        if(returnType !== each.returnType) {
            continue;
        }
        if(funcName !== each.funcName) {
            continue;
        }
        if(paramType.length !== each.paramType.length) {
            continue;
        }

        for(let i = 0; i < paramType.length; i++) {
            if(paramType[i] !== each.paramType[i]) {
                isTypeSame = false;
                break;
            }
        }
        if(isTypeSame === false) {
            continue;
        }

        return true;
    }

    return false;
};

/**
 * 在函数表中添加一项
 * @public
 * @param funcName {string} 函数名
 * @param returnType {string} 返回值类型
 * @param paramType {Array.<string>} 函数参数类型数组
 * @param paramName {Array.<string>} 函数参数名数组
 */
FuncSymbolTable.prototype.append = function(funcName, returnType, paramType, paramName) {
    let newItem = new FuncItem();
    newItem.funcName = funcName;
    newItem.returnType = returnType;

    for(let each of paramType) {
        newItem.paramType.push(each);
    }
    
    for(let each of paramName) {
        newItem.paramName.push(each);
    }

    this._table.push(newItem);
};

module.exports = FuncSymbolTable;