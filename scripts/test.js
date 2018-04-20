'use strict';

const fs = require('fs');
const path = require('path');
const execa = require('execa');

const rootPath = path.resolve(`${__dirname}/..`);
const cgjsBinary = path.resolve(`${rootPath}/node_modules/.bin/cgjs`);

const xvfbDisplayNumber = ':40';
const xvfb = execa('Xvfb', [xvfbDisplayNumber, '-ac']);

runEachFile(`${rootPath}/examples/optimisme-examples`);
runEachFile(`${rootPath}/examples/programmica-examples`);
runEachFile(`${rootPath}/examples/next`);

function runEachFile(dir) {
  fs.readdirSync(dir)
    .filter(name => name.endsWith('.js'))
    .forEach(name => {
      const filePath = `${dir}/${name}`;
      const filePathRelative = filePath.replace(rootPath, '');

      test(`test ${filePathRelative}`, done => {
        console.log(filePathRelative);

        const env = {
          ...process.env,
          DISPLAY: xvfbDisplayNumber
        };

        const proc = execa(cgjsBinary, [filePath], { cwd: rootPath, env });

        proc
          .catch(err => {
            if (err && !err.killed && err.signal !== 'SIGINT') {
              done(err);
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
