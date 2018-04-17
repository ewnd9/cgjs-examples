'use strict'

// transformed from /vendor/programmica-examples/headerbar.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

const window = new Gtk.Window();
window.set_default_size(-1, 200);
window.connect('destroy', Gtk.main_quit);

const headerbar = new Gtk.HeaderBar();
headerbar.set_title('HeaderBar');
headerbar.set_subtitle('With Subtitle');
headerbar.set_show_close_button(true);
headerbar.set_vexpand(false);
window.set_titlebar(headerbar);

window.show_all();

Gtk.main();
