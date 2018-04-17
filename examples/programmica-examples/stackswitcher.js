'use strict'

// transformed from /vendor/programmica-examples/stackswitcher.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

const window = new Gtk.Window();
window.set_title('StackSwitcher');
window.set_default_size(200, 200);
window.connect('destroy', Gtk.main_quit);

const grid = new Gtk.Grid();
window.add(grid);

const stack = new Gtk.Stack();
stack.set_vexpand(true);
stack.set_hexpand(true);
grid.attach(stack, 0, 1, 1, 1);

const stackswitcher = new Gtk.StackSwitcher();
stackswitcher.set_stack(stack);
grid.attach(stackswitcher, 0, 0, 1, 1);

let i;

for (i = 1; i < 6; i++) {
  const name = i.toString();
  const title = `Page ${name}`;

  const label = new Gtk.Label({ label: title });
  stack.add_titled(label, name, title);
}

window.show_all();

Gtk.main();
