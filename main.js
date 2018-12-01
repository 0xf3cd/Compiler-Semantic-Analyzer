const LR = require('./LR.js');

LR.setGrammar('./TestFile/Grammar-Simple.txt');
LR.setSource('./TestFile/example.cmm');
LR.initialize();

if(LR.isInitialized() !== 1) {
    console.log('need to initialize');
    return;
} 

while(true) {
    let temp = LR.getNext();
    if(temp.au.length >= 3 && temp.au.slice(0, 3) === 'acc') {
        console.log('acc');
        return;
    } 

    console.log(temp.au);
    console.log(temp.token.value);
    console.log(temp.symbol_name);

    if(temp.production_right[0] === 'ε') {
        console.log(temp.production_left + ' -> epsilon');
    } else {
        console.log(temp.production_left + ' -> ' + temp.production_right);
    }
    
    console.log(temp.error);
    console.log(temp.symbol_stack);
    console.log(temp.state_stack);
    console.log();

    if(temp.error < 0) {
        console.log('wrong!');
        break;
    } else if(temp.error === 3) {
        console.log('success!');
        break;
    }
}