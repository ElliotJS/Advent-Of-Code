const fs = require('fs');
const readline = require('readline');

module.exports = async function processLineByLine(strings) {
  const fileStream = fs.createReadStream('./input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const maxNums = [
    { string: 'red', max: 12 },
    { string: 'green', max: 13 },
    { string: 'blue', max: 14 },
  ];

  let total = 0;

  for await (const line of rl) {
    const colonIndex = line.indexOf(':');
    const gameId = Number.parseInt(line.slice(4, colonIndex));

    let gameData = line.slice(colonIndex + 1);
    gameData = gameData.split(';');
    let possible = true;

    for (roundData of gameData) {
      const colourDatas = roundData.split(',');
      for (colourData of colourDatas) {
        for (colour of maxNums) {
          if (colourData.includes(colour.string)) {
            console.log(`${colourData} - ${colour.max}`);
            const splitBySpaces = colourData.split(' ');
            if (Number.parseInt(splitBySpaces[1]) > colour.max) {
              console.log(`Failed ${total}`);
              possible = false;
            }
          }
        }
      }
    }
    if (possible) {
      console.log(`Not Failed ${total}`);
      total += gameId;
    }
  }
  console.log(total);
};

module.exports();
