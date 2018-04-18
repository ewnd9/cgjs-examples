'use strict';

const fs = require('fs');
const path = require('path');
const execa = require('execa');

const rootPath = path.resolve(`${__dirname}/..`);
const cgjsBinary = path.resolve(`${rootPath}/node_modules/.bin/cgjs`);

runEachFile(`${rootPath}/examples/optimisme-examples`);
runEachFile(`${rootPath}/examples/programmica-examples`);

function runEachFile(dir) {
  fs.readdirSync(dir)
    .filter(name => name.endsWith('.js'))
    .forEach(name => {
      const filePath = `${dir}/${name}`;
      const filePathRelative = filePath.replace(rootPath, '');

      test(`test ${filePathRelative}`, done => {
        console.log(filePathRelative);
        const proc = execa(cgjsBinary, [filePath], error => {
          if (error && !error.killed && error.signal !== 'SIGINT') {
            done(error);
          } else {
            done();
          }
        });

        setTimeout(() => {
          proc.kill('SIGINT');
          done();
        }, 1000);
      });
    });
}
