const fs = require('fs');
const readline = require('readline');

module.exports = async function processLineByLine() {
  const fileStream = fs.createReadStream('./input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let characters = [];

  let gearPartTable = [];

  for await (const line of rl) {
    let charactersInLine = [];
    gearPartTable.push([]);

    for (const character of line) {
      gearPartTable[gearPartTable.length - 1].push([]);
      charactersInLine.push(character);
    }

    characters.push(charactersInLine);
  }

  function is_numeric(c) {
    return (
      typeof c === 'string' && c.length == 1 && c >= '0' && c <= '9'
    );
  }

  function checkIsNearSymbol(x, y) {
    for (let relX = x - 1; relX <= x + 1; relX++) {
      for (let relY = y - 1; relY <= y + 1; relY++) {
        if (relX == x && relY == y) continue;

        if (
          relX < 0 ||
          relY < 0 ||
          relX >= characters.length ||
          relY >= characters[x].length
        )
          continue;

        if (
          !(
            is_numeric(characters[relX][relY]) ||
            characters[relX][relY] == '.'
          )
        ) {
          return { x: relX, y: relY };
        }
      }
    }

    return false;
  }

  let total = 0;
  let numberId = 0;

  for (let x = 0; x < characters.length; x++) {
    for (let y = 0; y < characters[x].length; y++) {
      if (is_numeric(characters[x][y])) {
        let number = '';
        numberId++;
        let stillNumber = true;
        let countNumber = false;
        let gearParts = [];
        while (y < characters[x].length && stillNumber) {
          if (is_numeric(characters[x][y])) {
            let isNearSymbol = checkIsNearSymbol(x, y);
            if (isNearSymbol !== false) {
              if (
                gearParts.findIndex(
                  (part) =>
                    part.x == isNearSymbol.x &&
                    part.y == isNearSymbol.y
                )
              ) {
                gearParts.push(isNearSymbol);
              }
              countNumber = true;
            }

            number += characters[x][y];
            y++;
          } else {
            stillNumber = false;
          }
        }
        if (countNumber) {
          for (let gearPart of gearParts) {
            gearPartTable[gearPart.x][gearPart.y].push(
              Number.parseInt(number)
            );
          }
        }
      }
    }
  }

  for (let x = 0; x < gearPartTable.length; x++) {
    for (let y = 0; y < gearPartTable[x].length; y++) {
      if (gearPartTable[x][y].length == 2) {
        total += gearPartTable[x][y][0] * gearPartTable[x][y][1];
      }
    }
  }

  console.log(total);
};

module.exports();
