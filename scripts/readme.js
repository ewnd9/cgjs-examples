'use strict';

const fs = require('fs');
const path = require('path');
const rootPath = path.resolve(`${__dirname}/..`);

const readme = fs.readFileSync(`${rootPath}/README.md`, 'utf-8');
const lines = readme.split('\n');
const installLineIndex = lines.findIndex(line => line === '## Install');

let listing = '';

listing += runEachFile(`examples/optimisme-examples`);
listing += runEachFile(`examples/programmica-examples`);

const result = [
  ...lines.slice(0, 4),
  ...listing.split('\n'),
  ...lines.slice(installLineIndex)
].join('\n');

fs.writeFileSync(`${rootPath}/README.md`, result);

function runEachFile(dir) {
  let str = '';

  str += `- [\`${path.basename(dir)}\`](${dir})\n`;
  str += fs.readdirSync(`${rootPath}/${dir}`)
    .reduce((acc, name) => {
      if (!name.endsWith('.js')) {
        return acc;
      }

      return acc + `  - [\`${name}\`](${dir}/${name})\n`;
    }, '');

  return str;
}
