'use strict';

const camelCase = require('lodash.camelcase');

module.exports = transform;

function transform(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.Identifier)
    .forEach(path => {
      if (path.parent.value.type === 'MemberExpression' &&
          path.parent.value.property === path.value &&
          path.node.name[0] >= 'a' && path.node.name[0] <= 'z') { // only lowercase for some reason?

        j(path).replaceWith(
          j.identifier(camelCase(path.node.name))
        );
      }
    })
    .toSource({ quote: 'single' });
}
