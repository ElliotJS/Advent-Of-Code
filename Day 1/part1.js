module.exports = async function processLineByLine(strings) {
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  let numbers = [];
  let total = 0;

  for await (const line of strings) {
    // Each line in input.txt will be successively available here as `line`.
    let num1 = '';
    let num2 = '';

    const lineToUse = line.replace(/\D/g, '');
    num1 += lineToUse[0];
    num2 += lineToUse[lineToUse.length - 1];

    const val = Number.parseInt(num1 + num2);
    total += val;

    //console.log(`${lineToUse}  ${num1} ${num2} ${val}`);
  }

  return total;
};
