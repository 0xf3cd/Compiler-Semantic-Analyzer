const fs = require('fs');
const data = fs.readFileSync('../Grammar/Production-No.txt').toString();
const prods = data.split('\n');

for(let i = 1; i <= 58; i++) {
    const funcContent = `const f${i} = function(right) {\n\t// ${prods[i-1]}\n};\nallFuncs[${i}] = f${i};\n`;
    console.log(funcContent)
}