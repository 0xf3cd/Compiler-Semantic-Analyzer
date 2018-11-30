let ffi = require("ffi");

let dll = ffi.Library('./LR', {
    'setGrammar': ['void', ['string']],
    'setSource': ['void', ['string']],
    'reset': ['string', []],
    'initialize': ['int', []],
    'isInitialized': ['int', []],
    'isLR0': ['int', []],
    'isSLR1': ['int', []],
});

dll.setGrammar('./Grammar.txt');
dll.setSource('./example.cmm');
console.log(dll.initialize());
console.log(dll.isInitialized());
console.log(dll.isLR0());
console.log(dll.isSLR1());