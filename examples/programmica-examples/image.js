'use strict'

// transformed from /vendor/programmica-examples/image.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

const window = new Gtk.Window();
window.set_title('Image');
window.connect('destroy', Gtk.main_quit);

const image = new Gtk.Image();
image.set_from_file('_resources/gtk.png');
window.add(image);

window.show_all();

Gtk.main();
