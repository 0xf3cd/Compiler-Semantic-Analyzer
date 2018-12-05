// 变量符号表

/**
 * 符号表项
 * @class
 */
class VarItem {
    constructor() {
        /**
         * 变量名
         * @public
         * @type {string}
         */
        this.varName = null;

        /**
         * 变量类型
         * @public
         * @type {string}
         */
        this.varType = null;
    }
}

/**
 * 符号表
 * @class
 */
class VarSymbolTable {
    constructor() {
        /**
         * 表名
         * @private
         * @type {string}
         */
        this._tableName = 'default';

        /**
         * 记录变量名的数组
         * @private
         * @type {Array.<VarItem>}
         */
        this._table = new Array();
    }
}

/**
 * 设置表名
 * @public
 * @param newName {string}
 */
VarSymbolTable.prototype.setTableName = function(newName) {
    this._tableName = newName;
};

/**
 * 获取表名
 * @public
 * @return {string}
 */
VarSymbolTable.prototype.getTableName = function() {
    return this._tableName;
};

/**
 * 插入变量
 * @public
 * @param varName {string}
 * @param varType {string}
 */
VarSymbolTable.prototype.append = function(varName, varType) {
    let newVar = new VarItem();

    newVar.varName = varName;
    newVar.varType = varType;

    this._table.push(newVar);
};

/**
 * 查询是否有某名字的变量
 * @public
 * @param varName {string}
 * @return {boolean} 
 */
VarSymbolTable.prototype.hasVar = function(varName) {
    for(let each of this._table) {
        if(each.varName === varName) {
            return true;
        }
    }
    return false;
};

/**
 * 查询是否有某名字的变量的类型
 * @public
 * @param varName {string}
 * @return {string} 返回变量的类型，未找到返回 null
 */
VarSymbolTable.prototype.getVarType = function(varName) {
    for(let each of this._table) {
        if(each.varName === varName) {
            return each.varType;
        }
    }
    return null;
};

module.exports = VarSymbolTable;