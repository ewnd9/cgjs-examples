'use strict'

// transformed from /vendor/programmica-examples/listbox.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

const window = new Gtk.Window();
window.set_title('ListBox');
window.connect('destroy', Gtk.main_quit);

const listbox = new Gtk.ListBox();
window.add(listbox);

for (let count = 1; count < 10; count++) {
  const label = new Gtk.Label({ label: `Label ${count}` });
  listbox.insert(label, count);
}

window.show_all();

Gtk.main();
