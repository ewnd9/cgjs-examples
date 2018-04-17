'use strict'

// transformed from /vendor/programmica-examples/stack.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

function on_page_clicked(widget) {
  stack.set_visible_child_name(widget.page);
}

const window = new Gtk.Window();
window.set_title('Stack');
window.set_default_size(200, 200);
window.connect('destroy', Gtk.main_quit);

const grid = new Gtk.Grid();
window.add(grid);

var stack = new Gtk.Stack();
stack.set_vexpand(true);
stack.set_hexpand(true);
grid.attach(stack, 0, 0, 6, 1);

let i;

for (i = 1; i < 6; i++) {
  const name = i.toString();

  const label = new Gtk.Label({ label: `Page ${name}` });
  stack.add_named(label, name);

  const button = new Gtk.Button({ label: `Page ${name}` });
  button.page = name;
  button.connect('clicked', function() {
    on_page_clicked(button);
  });
  grid.attach(button, i, 1, 1, 1);
}

window.show_all();

Gtk.main();
