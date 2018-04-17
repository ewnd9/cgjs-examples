'use strict'

// transformed from /vendor/programmica-examples/frame.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

const window = new Gtk.Window();
window.set_title('Frame');
window.set_default_size(200, 200);
window.set_border_width(5);
window.connect('destroy', Gtk.main_quit);

const frame = new Gtk.Frame();
frame.set_label('Frame Example');
window.add(frame);

const label = new Gtk.Label();
label.set_label('Label in a Frame');
frame.add(label);

window.show_all();

Gtk.main();
