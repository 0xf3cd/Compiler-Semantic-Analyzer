const Parser = require('./Parser.js');

let P = new Parser();
P.initialize();
while(true) {
    let record = P.getNext();

    console.log(record.parseResult);
    console.log(record.stateStack);
    console.log(record.symbolStack);
    console.log();

    if(record.parseResult === 'error' || record.parseResult === 'acc') {
        break;
    }
}

let t = P.getParseTree();
console.log(t); //S