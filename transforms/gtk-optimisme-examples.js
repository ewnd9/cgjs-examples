'use strict';

// const camelCase = require('lodash.camelcase');

module.exports = transform;

function transform(file, api) {
  const j = api.jscodeshift;

  const source = j(file.source);

  source
    .find(j.FunctionDeclaration, { id: { name: 'getAppFileInfo' } })
    .remove();

  source
    .find(j.VariableDeclaration, { declarations: [{ id: { name: 'path' } }] })
    .remove();

  source
    .find(j.VariableDeclaration, { declarations: [{ id: { name: 'Lang' } }] })
    .remove();

  source
    .find(j.ExpressionStatement, {
      expression: {
        callee: {
          object: {
            object: { name: 'imports' },
            property: { name: 'searchPath' }
          },
          property: { name: 'push' }
        }
      }
    })
    .remove();

  source
    .find(j.MemberExpression, {
      object: {
        object: { name: 'imports' },
        property: { name: 'assets' }
      }
    })
    .forEach(path => {
      const moduleName = path.value.property.name;

      j(path).replaceWith(
        j.callExpression(j.identifier('require'), [j.literal(`./assets/${moduleName}`)])
      );
    });

  source
    .find(j.Identifier, { name: 'path' })
    .replaceWith(j.identifier('__dirname'));

  return source.toSource({ quote: 'single' });
}
