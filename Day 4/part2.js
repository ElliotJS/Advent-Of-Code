const fs = require('fs');
const readline = require('readline');

module.exports = async function processLineByLine() {
  const fileStream = fs.createReadStream('./input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let total = 0;

  let evaluateCard = function (line) {
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

    return score;
  };

  let numTimesToEvaluateCard = [];
  let cardsToEvaluate = [];
  let scores = [];

  for await (const line of rl) {
    numTimesToEvaluateCard.push(1);
    cardsToEvaluate.push(line);
  }

  for (let i = 0; i < cardsToEvaluate.length; i++) {
    console.log(i);
    while (numTimesToEvaluateCard[i] > 0) {
      total++;
      numTimesToEvaluateCard[i]--;

      let score = 0;

      if (scores[i] !== undefined) {
        score = scores[i];
      } else {
        score = evaluateCard(cardsToEvaluate[i]);
      }

      for (
        let j = i + 1;
        j < i + score + 1 && j < cardsToEvaluate.length;
        j++
      ) {
        numTimesToEvaluateCard[j]++;
      }
    }
  }

  console.log(total);
};

module.exports();
