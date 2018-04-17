'use strict'

// transformed from /vendor/programmica-examples/entrybuffer.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

const window = new Gtk.Window();
window.set_title('EntryBuffer');
window.connect('destroy', Gtk.main_quit);

const box = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL });
window.add(box);

const entrybuffer = new Gtk.EntryBuffer();
entrybuffer.set_text('Text in a buffer...', -1);

var entry = new Gtk.Entry();
entry.set_buffer(entrybuffer);
box.pack_start(entry, false, false, 0);
var entry = new Gtk.Entry();
entry.set_buffer(entrybuffer);
box.pack_start(entry, false, false, 0);
var entry = new Gtk.Entry();
entry.set_buffer(entrybuffer);
box.pack_start(entry, false, false, 0);

window.show_all();

Gtk.main();
