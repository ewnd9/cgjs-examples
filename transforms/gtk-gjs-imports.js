'use strict';

module.exports = transform;

function transform(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.VariableDeclaration)
    .forEach(path => {
      path.value.declarations.forEach(decl => {
        if (!decl.init || !decl.init.property || !decl.init.object || !decl.init.object.object) {
          return;
        }

        const init = decl.init;

        if (init.object.object.name !== 'imports' ||
            init.object.property.name !== 'gi') {
          return;
        }

        const leftSide = decl.id.name;
        const rightSide = init.property.name;

        // @TODO: see https://github.com/cgjs/cgjs/issues/23
        const exceptions = [
          'Clutter',
          'GtkClutter',
          // camel patching is missing `GObject.TYPE_STRING` (see vendor/programmica-examples/treestore.js)
          'GObject'
        ];

        if (leftSide !== rightSide || exceptions.includes(rightSide)) {
          return;
        }

        const propName = j.identifier(leftSide);
        const prop = j.property('init', propName, propName);
        prop.shorthand = true;

        j(path).replaceWith(
          j.variableDeclaration(
            'const',
            [
              j.variableDeclarator(
                j.identifier(leftSide),
                j.callExpression(j.identifier('require'), [j.literal(leftSide)])
              )
            ]
          )
        );
      });
    })
    .toSource({ quote: 'single' });
}
