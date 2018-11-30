let ffi = require("ffi");

let dll = ffi.Library('./Dylib/LR', {
    'setGrammar': ['void', ['string']],
    'setSource': ['void', ['string']],
    'reset': ['string', []],
    'initialize': ['int', []],
    'isInitialized': ['int', []],
    'isLR0': ['int', []],
    'isSLR1': ['int', []],
    'test_analyze': ['void', []],
});

dll.setGrammar('./TestFile/Grammar.txt');
dll.setSource('./TestFile/example.cmm');
console.log(dll.initialize());
console.log(dll.isInitialized());
console.log(dll.isLR0());
console.log(dll.isSLR1());
dll.test_analyze();