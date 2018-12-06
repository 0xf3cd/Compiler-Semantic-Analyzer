const Parser = require('./Parser.js');
const IR = require('./IR_Generator.js');

let P = new Parser();
let I = new IR();

P.setGrammar('./Grammar/Grammar.txt');
P.setSource('./Source/Example.cmm');
P.initialize();


I.readProdNoFile();
// I._prodNo['<FuncDecl> float ID ( <FormalParams> ) <StmtBlock>'] = 13;
// console.log(I._prodNo);

console.log(`LR0: ${P.isLR0()}`);
console.log();
console.log(`SLR1: ${P.isSLR1()}`);
console.log();

while(true) {
    let record = P.getNext();

    I.analyze(record);
    // console.log(record.parseResult);
    // console.log(record.stateStack);
    // console.log(record.symbolStack);
    // console.log();

    if(record.parseResult === 'error' || record.parseResult === 'acc') {
        break;
    }
}

let t = P.getParseTree();
console.log(t); //S