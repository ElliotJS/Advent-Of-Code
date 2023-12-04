const fs = require('fs');
const readline = require('readline');

module.exports = async function processLineByLine() {
  const fileStream = fs.createReadStream('./input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let characters = [];

  for await (const line of rl) {
    let charactersInLine = [];

    for (const character of line) {
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
          return true;
        }
      }
    }

    return false;
  }

  let total = 0;

  for (let x = 0; x < characters.length; x++) {
    for (let y = 0; y < characters[x].length; y++) {
      if (is_numeric(characters[x][y])) {
        let number = '';
        let stillNumber = true;
        let countNumber = false;
        while (y < characters[x].length && stillNumber) {
          if (is_numeric(characters[x][y])) {
            if (checkIsNearSymbol(x, y)) {
              console.log(characters[x][y]);
              countNumber = true;
            }

            number += characters[x][y];
            y++;
          } else {
            stillNumber = false;
          }
        }
        if (countNumber) {
          console.log(number);
          total += Number.parseInt(number);
        }
      }
    }
  }

  console.log(total);
};

module.exports();
