'use strict'

// transformed from /vendor/programmica-examples/window.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

const window = new Gtk.Window();
window.set_title('Window');
window.connect('destroy', Gtk.main_quit);

window.show_all();

Gtk.main();
