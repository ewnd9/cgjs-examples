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
  const publish = process.argv[2] === '--publish';

  const images = [{
    name: 'ewnd9/gjs-examples:ubuntu-17.10',
    dir: `${rootPath}/scripts/docker/ubuntu-17-10`
  }, {
    name: 'ewnd9/gjs-examples:debian-sid',
    dir: `${rootPath}/scripts/docker/debian-sid`
  }];

  for (const { name, dir } of images) {
    await execa('docker', ['build', '-t', name, '.'], {
      cwd: dir,
      stdio: 'inherit'
    });

    if (publish) {
      await execa('docker', ['push', name], { stdio: 'inherit' });
    }
  }
}
