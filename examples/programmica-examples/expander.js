'use strict'

// transformed from /vendor/programmica-examples/expander.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

const window = new Gtk.Window();
window.set_title('Expander');
window.set_default_size(200, 200);
window.connect('destroy', Gtk.main_quit);

const expander = new Gtk.Expander({ label: 'Click to open/close' });
window.add(expander);

const label = new Gtk.Label({ label: 'Label contained within\nan Expander' });
expander.add(label);

window.show_all();

Gtk.main();
