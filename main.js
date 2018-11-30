const LR = require('./LR.js');

LR.setGrammar('./TestFile/Grammar.txt');
LR.setSource('./TestFile/example.cmm');
LR.initialize();

if(LR.isInitialized() !== 1) {
    console.log('need to initialize');
} else {
    while(true) {
        let temp = LR.getNext();
        console.log(temp.au);
        console.log(temp.token.value);
        console.log(temp.symbol_name);
        console.log(temp.production_left + ' -> ' + temp.production_right);
        console.log(temp.error);
        console.log(temp.symbol_stack);
        console.log(temp.state_stack);
        console.log();
    
        if(temp.error < 0) {
            console.log('wrong!');
            break;
        } else if(temp.error == 3) {
            console.log('success!');
            break;
        }
    }
}