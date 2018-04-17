'use strict'

// transformed from /vendor/programmica-examples/overlay.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

const window = new Gtk.Window();
window.set_title('Overlay');
window.set_default_size(200, 200);
window.connect('destroy', Gtk.main_quit);

const overlay = new Gtk.Overlay();
window.add(overlay);

const textview = new Gtk.TextView();
textview.set_vexpand(true);
textview.set_hexpand(true);
overlay.add(textview);

const button = new Gtk.Button({ label: 'Overlayed Button' });
button.set_valign(Gtk.Align.CENTER);
button.set_halign(Gtk.Align.CENTER);
overlay.add_overlay(button);

window.show_all();

Gtk.main();
