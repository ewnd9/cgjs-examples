'use strict';

const fs = require('fs');
const path = require('path');
const execa = require('execa');

const jscodeshift = require('jscodeshift');
const lebab = require('lebab');
const prettier = require('prettier');

const rootPath = path.resolve(`${__dirname}/..`);

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

async function main() {
  const fns = [
    async () => {
      const srcDir = `${rootPath}/vendor/optimisme-examples`;
      const destDir = `${rootPath}/examples/optimisme-examples`;
      const license = 'unspecified';

      execa.sync('rm', ['-rf', destDir]);
      execa.sync('mkdir', ['-p', destDir]);
      execa.sync('cp', ['-R', `${srcDir}/assets`, `${destDir}/assets`]);

      transformDirectory({ srcDir, destDir, license });
    },
    async () => {
      const srcDir = `${rootPath}/vendor/programmica-examples`;
      const destDir = `${rootPath}/examples/programmica-examples`;
      const license = 'CC0-1.0';

      execa.sync('rm', ['-rf', destDir]);
      execa.sync('mkdir', ['-p', destDir]);
      execa.sync('cp', ['-R', `${srcDir}/_resources`, `${destDir}/_resources`]);

      transformDirectory({
        srcDir,
        destDir,
        license,
        ignored: [
          'toolpalette.js', // TypeError: Gtk.ToolPavarte is not a constructor
          'entrycompletion.js' // TypeError: Gtk.EntryCompvarion is not a constructor
        ],
        lebabIgnored: {
          let: ['iconview.js', 'treestore.js']
        }
      });
    }
  ];

  for (const fn of fns) {
    await fn();
  }
}

function transformDirectory({ srcDir, destDir, license, ignored = [], lebabIgnored = {} }) {
  fs.readdirSync(srcDir)
    .filter(name => name.endsWith('.js') && !ignored.includes(name))
    .forEach(name => {
      transform({
        srcPath: `${srcDir}/${name}`,
        destPath: `${destDir}/${name}`,
        license,
        transforms: [
          `${rootPath}/transforms/gtk-optimisme-examples.js`,
          `${rootPath}/transforms/gtk-programmica-examples.js`,
          `${rootPath}/transforms/gtk-gjs-imports.js`
        ],
        lebabTransforms: [
          'let',
          'template',
          'class'
        ].filter(lebabName => !lebabIgnored[lebabName] || !lebabIgnored[lebabName].includes(name))
      });
    });
}

function transform({ srcPath, destPath, license, transforms, lebabTransforms }) {
  const content = fs.readFileSync(srcPath, 'utf-8');

  let result = content.replace('#!/usr/bin/gjs', '');

  for (const t of transforms) {
    const mod = require(t);
    result = mod({ source: result }, { jscodeshift }, {});
  }

  const { code } = lebab.transform(result, lebabTransforms);
  result = code;
  result = prettier.format(result, {
    singleQuote: true
  });

  const srcPathRelative = srcPath.replace(rootPath, '');
  const currentPathRelative = __filename.replace(rootPath, '');

  fs.writeFileSync(destPath, `'use strict'\n\n// transformed from ${srcPathRelative} by ${currentPathRelative}\n// (license ${license})\n\n${result}`);
}
