'use strict';

// const camelCase = require('lodash.camelcase');

module.exports = transform;

function transform(file, api) {
  const j = api.jscodeshift;

  const source = j(file.source);

  source
    .find(j.Literal, {
      value: 'gtk.png'
    })
    .replaceWith(() => j.templateLiteral(
      [
        j.templateElement({ raw: '', cooked: '' }, false),
        j.templateElement({ raw: '/_resources/gtk.png', cooked: '/_resources/gtk.png' }, true)
      ],
      [
        j.identifier('__dirname')
      ]
    ));

  return source.toSource({ quote: 'single' });
}
