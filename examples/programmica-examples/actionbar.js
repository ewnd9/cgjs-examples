'use strict'

// transformed from /vendor/programmica-examples/actionbar.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

const window = new Gtk.Window();
window.set_default_size(200, 200);
window.set_title('ActionBar');
window.connect('destroy', Gtk.main_quit);

const grid = new Gtk.Grid();
window.add(grid);

const actionbar = new Gtk.ActionBar();
actionbar.set_hexpand(true);
grid.attach(actionbar, 0, 1, 1, 1);

const label = new Gtk.Label();
label.set_vexpand(true);
grid.attach(label, 0, 0, 1, 1);

var button = new Gtk.Button({ label: 'Cut' });
actionbar.pack_start(button);
var button = new Gtk.Button({ label: 'Copy' });
actionbar.pack_start(button);
var button = new Gtk.Button({ label: 'Paste' });
actionbar.pack_end(button);

window.show_all();

Gtk.main();
