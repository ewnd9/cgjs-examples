'use strict'

// transformed from /vendor/programmica-examples/fontbutton.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

function on_font_set() {
  print(`Font set to ${fontbutton.get_font()}`);
}

const window = new Gtk.Window();
window.set_title('FontButton');
window.set_default_size(200, -1);
window.connect('destroy', Gtk.main_quit);

var fontbutton = new Gtk.FontButton();
fontbutton.connect('font-set', on_font_set);
window.add(fontbutton);

window.show_all();

Gtk.main();
