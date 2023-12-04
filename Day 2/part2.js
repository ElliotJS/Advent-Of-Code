const fs = require('fs');
const readline = require('readline');

module.exports = async function processLineByLine() {
  const fileStream = fs.createReadStream('./input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const maxNums = [
    { string: 'red', lowest: 0 },
    { string: 'green', lowest: 0 },
    { string: 'blue', lowest: 0 },
  ];

  let total = 0;

  for await (const line of rl) {
    const colonIndex = line.indexOf(':');

    let gameData = line.slice(colonIndex + 1);
    gameData = gameData.split(';');

    let maxNumsTemp = maxNums;
    let lowestVals = { red: 0, green: 0, blue: 0 };

    for (roundData of gameData) {
      const colourDatas = roundData.split(',');
      for (colourData of colourDatas) {
        for (colour of maxNumsTemp) {
          if (colourData.includes(colour.string)) {
            const splitBySpaces = colourData.split(' ');
            if (
              Number.parseInt(splitBySpaces[1]) >
              lowestVals[colour.string]
            ) {
              console.log(`${colourData} - ${colour.max}`);
              lowestVals[colour.string] = Number.parseInt(
                splitBySpaces[1]
              );
            }
          }
        }
      }
    }

    let power = lowestVals.red * lowestVals.green * lowestVals.blue;
    console.log(`${power}`);

    total += power;
  }
  console.log(total);
};

module.exports();
