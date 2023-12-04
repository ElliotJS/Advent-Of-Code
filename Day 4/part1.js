const fs = require('fs');
const readline = require('readline');

module.exports = async function processLineByLine() {
  const fileStream = fs.createReadStream('./input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let total = 0;

  for await (const line of rl) {
    const colonIndex = line.indexOf(':');
    const cardId = Number.parseInt(line.slice(4, colonIndex));

    let cardData = line.slice(colonIndex + 1);
    cardData = cardData.split('|');

    let winningNumbers = cardData[0].split(' ');
    let chosenNumbers = cardData[1].split(' ');

    let score = 0;

    for (winningNumber of winningNumbers) {
      if (winningNumber == '') continue;
      if (chosenNumbers.includes(winningNumber)) {
        score++;
      }
    }

    if (score > 0) score = 2 ** (score - 1);
    console.log(score);

    total += score;
  }

  console.log(total);
};

module.exports();
