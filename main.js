// const Parser = require('./Parser.js');

// let P = new Parser();
// P.setGrammar('./Grammar/Grammar.txt');
// P.setSource('./Source/Example.cmm')
// P.initialize();
// while(true) {
//     let record = P.getNext();

//     console.log(record.parseResult);
//     console.log(record.stateStack);
//     console.log(record.symbolStack);
//     console.log();

//     if(record.parseResult === 'error' || record.parseResult === 'acc') {
//         break;
//     }
// }

// let t = P.getParseTree();
// console.log(t); //S

// console.log();
// console.log(`LR0: ${P.isLR0()}`);
// console.log();
// console.log(`SLR1: ${P.isSLR1()}`);

const FST = require('./FuncSymbolTable.js');
const VST = require('./VarSymbolTable.js')

const F = new FST();
const V = new VST();

F.append('write', 'void', ['int'], ['a']);
F.append('write2', 'void', ['float'], ['a']);

console.log(F.hasFunc('write', 'void', ['int']));
console.log(F.hasFunc('write', 'void', ['float']));
console.log(F.hasFunc('write2', 'void', ['int']));
console.log(F.hasFunc('write2', 'void', ['float']));
console.log();

V.setTableName('global');
console.log(V.getTableName());
V.append('a', 'int');
V.append('b', 'float');
console.log(V.hasVar('a'));
console.log(V.hasVar('c'));
console.log(V.getVarType('b'));
console.log(V.getVarType('d'));