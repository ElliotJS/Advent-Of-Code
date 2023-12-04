const part1 = require('./part1.js');
const fs = require('fs');
const readline = require('readline');

module.exports = async function editStringAndProcess() {
  const fileStream = fs.createReadStream('./input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const editedString = [];

  const stringNumPairs = [
    { number: '1', string: 'one' },
    { number: '2', string: 'two' },
    { number: '3', string: 'three' },
    { number: '4', string: 'four' },
    { number: '5', string: 'five' },
    { number: '6', string: 'six' },
    { number: '7', string: 'seven' },
    { number: '8', string: 'eight' },
    { number: '9', string: 'nine' },
  ];

  for await (const line of rl) {
    let newLine = line;

    changeInPos = 0;

    for (stringNumPair of stringNumPairs) {
      const firstIndex = newLine.indexOf(stringNumPair.string);

      if (firstIndex >= 0) {
        newLine =
          newLine.slice(0, firstIndex + 1) +
          stringNumPair.number +
          newLine.slice(firstIndex + 1);
      }

      const lastIndex = newLine.lastIndexOf(stringNumPair.string);

      if (lastIndex >= 0) {
        newLine =
          newLine.slice(0, lastIndex + 1) +
          stringNumPair.number +
          newLine.slice(lastIndex + 1);
      }
    }

    console.log(`${line} ${newLine.replace(/\D/g, '')}`);

    editedString.push(newLine);
  }

  console.log(await part1(editedString));
};

module.exports();
