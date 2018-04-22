'use strict';

const fs = require('fs');
const path = require('path');
const rootPath = path.resolve(`${__dirname}/..`);

const readme = fs.readFileSync(`${rootPath}/README.md`, 'utf-8');
const lines = readme.split('\n');
const installLineIndex = lines.findIndex(line => line === '## Install');

const listing = getListing();

const result = [
  ...lines.slice(0, lines.findIndex(line => line.startsWith(`- [\`optimisme-examples\``))),
  ...listing.split('\n'),
  ...lines.slice(installLineIndex)
].join('\n');

fs.writeFileSync(`${rootPath}/README.md`, result);

function runEachFile(dir, { repo, files = {} }) {
  let str = '';

  const repoLink = `[${repo.split('/').slice(3).join('/')}](${repo})`;
  str += `- [\`${path.basename(dir)}\`](${dir}), forked from ${repoLink}\n`;
  str += '\n' + prepend('<details><summary>Listing</summary>', 2) + '\n\n';
  str += prepend(getFilesList(dir, { files }), 2);
  str += prepend('</details>\n\n', 2);

  return str;
}

function getFilesList(dir, { files }) {
  return fs.readdirSync(`${rootPath}/${dir}`)
    .reduce((acc, name) => {
      if (!name.endsWith('.js')) {
        return acc;
      }

      let str = prepend(`- [\`${name}\`](${dir}/${name})\n`, 2);

      if (files[name] && files[name].images) {
        str += prepend(`\n<details><summary>Screenshot</summary>\n\n`, 4);
        files[name].images.forEach((image, index) => {
          str += prepend(`![${name}${index}](${image})\n`, 6);
        });
        str += prepend('\n</details>\n\n', 4);
      }

      return acc + str;
    }, '');
}

function getListing() {
  let listing = '';

  listing += runEachFile(`examples/optimisme-examples`, {
    repo: 'https://github.com/optimisme/gjs-examples',
    files: {
      'egAsset.js': {
        images: ['https://raw.github.com/optimisme/gjs-examples/master/captures/egAsset0.png']
      },
      'egCairo.js': {
        images: ['https://raw.github.com/optimisme/gjs-examples/master/captures/egCairo0.png']
      },
      'egClutter.js': {
        images: ['https://raw.github.com/optimisme/gjs-examples/master/captures/egClutter0.png']
      },
      'egCss.js': {
        images: ['https://raw.github.com/optimisme/gjs-examples/master/captures/egCss0.png']
      },
      'egDialog.js': {
        images: [
          'https://raw.github.com/optimisme/gjs-examples/master/captures/egDialog0.png',
          'https://raw.github.com/optimisme/gjs-examples/master/captures/egDialog1.png',
          'https://raw.github.com/optimisme/gjs-examples/master/captures/egDialog2.png'
        ]
      },
      'egEvent.js': {
        images: ['https://raw.github.com/optimisme/gjs-examples/master/captures/egEvent0.png']
      },
      'egHeader.js': {
        images: ['https://raw.github.com/optimisme/gjs-examples/master/captures/egHeader0.png']
      },
      'egIcon.js': {
        images: [
          'https://raw.github.com/optimisme/gjs-examples/master/captures/egIcon0.png',
          'https://raw.github.com/optimisme/gjs-examples/master/captures/egIcon1.png'
        ]
      },
      'egInfo.js': {
        images: ['https://raw.github.com/optimisme/gjs-examples/master/captures/egInfo0.png']
      },
      'egJSON.js': {
        images: ['https://raw.github.com/optimisme/gjs-examples/master/captures/egJSON0.png']
      },
      'egJustify.js': {
        images: ['https://raw.github.com/optimisme/gjs-examples/master/captures/egJustify0.png']
      },
      'egList.js': {
        images: ['https://raw.github.com/optimisme/gjs-examples/master/captures/egList0.png']
      },
      'egOpen.js': {
        images: [
          'https://raw.github.com/optimisme/gjs-examples/master/captures/egOpen0.png',
          'https://raw.github.com/optimisme/gjs-examples/master/captures/egOpen1.png'
        ]
      },
      'egTimers.js': {
        images: ['https://raw.github.com/optimisme/gjs-examples/master/captures/egTimers0.png']
      },
      'egSearch.js': {
        images: ['https://raw.github.com/optimisme/gjs-examples/master/captures/egSearch0.png']
      },
      'egSelect.js': {
        images: [
          'https://raw.github.com/optimisme/gjs-examples/master/captures/egSelect0.png',
          'https://raw.github.com/optimisme/gjs-examples/master/captures/egSelect1.png'
        ]
      },
      'egSpawn.js': {
        images: ['https://raw.github.com/optimisme/gjs-examples/master/captures/egSpawn0.png']
      },
      'egWebmsg.js': {
        images: ['https://raw.github.com/optimisme/gjs-examples/master/captures/egWebmsg0.png']
      }
    }
  });

  listing += runEachFile(`examples/programmica-examples`, {
    repo: 'https://github.com/Programmica/gjs-gtk-examples'
  });

  return listing;
}

function prepend(str, count) {
  return str.split('\n').map(line => line ? `${' '.repeat(count)}${line}` : '').join('\n');
}
