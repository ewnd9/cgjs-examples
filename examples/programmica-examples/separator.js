'use strict'

// transformed from /vendor/programmica-examples/separator.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

const window = new Gtk.Window();
window.set_title('Separator');
window.set_default_size(400, 200);
window.connect('destroy', Gtk.main_quit);

const grid = new Gtk.Grid();
window.add(grid);

var separator = new Gtk.Separator();
separator.set_hexpand(true);
separator.set_vexpand(true);
grid.attach(separator, 0, 0, 1, 1);

var separator = new Gtk.Separator();
separator.set_orientation(Gtk.Orientation.VERTICAL);
separator.set_hexpand(true);
separator.set_vexpand(true);
grid.attach(separator, 1, 0, 1, 1);

window.show_all();

Gtk.main();
