const fs = require('fs');
const readline = require('readline');

module.exports = async function processLineByLine() {
  const fileStream = fs.createReadStream('./input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let seeds = [];

  let processedSeed = [];

  for await (const line of rl) {
    if (seeds.length == 0) {
      seeds = line.split(':')[1].split(' ').slice(1);
      for (let i = 0; i < seeds.length; i++) {
        seeds[i] = Number.parseInt(seeds[i]);
      }
      continue;
    }
    for (let i = 0; i < seeds.length; i++) {
      processedSeed.push(false);
    }
    if (line.includes('map')) {
      processedSeed = [];
    } else {
      let data = line.split(' ');
      if (data.length != 3) continue;

      for (let i = 0; i < data.length; i++) {
        data[i] = Number.parseInt(data[i]);
      }

      for (let i = 0; i < seeds.length; i++) {
        if (processedSeed[i]) continue;

        for (let j = 0; j < data.length; j++) {
          if (processedSeed[i]) continue;
          if (seeds[i] >= data[1] && seeds[i] < data[1] + data[2]) {
            seeds[i] = seeds[i] + (data[0] - data[1]);
            processedSeed[i] = true;
            break;
          }
        }
      }
    }
  }

  console.log(seeds);

  let lowest = seeds[0];

  for (let i = 1; i < seeds.length; i++) {
    if (seeds[i] < lowest) lowest = seeds[i];
  }

  console.log(lowest);
};

module.exports();
