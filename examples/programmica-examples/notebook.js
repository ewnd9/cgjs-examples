'use strict'

// transformed from /vendor/programmica-examples/notebook.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

const window = new Gtk.Window();
window.set_title('Notebook');
window.set_default_size(200, 200);
window.connect('destroy', Gtk.main_quit);

const notebook = new Gtk.Notebook();
window.add(notebook);

for (let i = 1; i < 6; i++) {
  const child = new Gtk.Label({ label: `Page ${i} Child Widget` });
  const title = new Gtk.Label({ label: `Page ${i}` });
  notebook.append_page(child, title);
}

window.show_all();

Gtk.main();
