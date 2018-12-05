const fs = require('fs');
const data = fs.readFileSync('../Grammar/Production-No.txt').toString();
const prods = data.split('\n');

for(let i = 1; i <= 58; i++) {
    const funcContent = `IR_Generator.prototype._f${i} = function(right) {\n\t// ${prods[i-1]}\n};\n`;
    console.log(funcContent)
}

for(let i = 1; i <= 58; i++) {
    const content = `this._allFuncs[${i}] = f${i};`;
    console.log(content)
}