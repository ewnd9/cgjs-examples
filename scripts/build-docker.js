'use strict';

const path = require('path');
const execa = require('execa');
const rootPath = path.resolve(`${__dirname}/..`);

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

async function main() {
  await execa('docker', ['build', '-t', 'cgjs-examples-ubuntu:17.10', '.'], {
    cwd: `${rootPath}/scripts/docker/ubuntu-17-10`,
    stdio: 'inherit'
  });
  await execa('docker', ['build', '-t', 'cgjs-examples-debian:sid', '.'], {
    cwd: `${rootPath}/scripts/docker/debian-sid`,
    stdio: 'inherit'
  });
}
