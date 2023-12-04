const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('./input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let numbers = [];

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    let num1 = '';
    let num2 = '';

    for (i = 0; i < line.length; i++) {
      if (/^\d+$/.test(line[i])) {
        if (num1 === '') num1 += line[i];
      }
      if (/^\d+$/.test(line[line.length - 1 - i])) {
        if (num2 === '') num2 += line[line.length - 1 - i];
      }
    }

    numbers.push(Number.parseInt(num1 + num2));

    console.log(`${line} ${num1 + num2}`);
  }

  const totalVal = numbers.reduce(
    (partialTotal, val) => partialTotal + val,
    0
  );

  console.log(totalVal);
}

processLineByLine();
