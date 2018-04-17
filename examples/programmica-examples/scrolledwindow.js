'use strict'

// transformed from /vendor/programmica-examples/scrolledwindow.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

const window = new Gtk.Window();
window.set_default_size(200, 200);
window.set_title('ScrolledWindow');
window.connect('destroy', Gtk.main_quit);

const scrolledwindow = new Gtk.ScrolledWindow();
window.add(scrolledwindow);

const layout = new Gtk.Layout();
layout.set_size(800, 600);
layout.set_vexpand(true);
layout.set_hexpand(true);
scrolledwindow.add(layout);

var button = new Gtk.Button({ label: 'Button 1' });
layout.put(button, 645, 140);
var button = new Gtk.Button({ label: 'Button 2' });
layout.put(button, 130, 225);
var button = new Gtk.Button({ label: 'Button 3' });
layout.put(button, 680, 350);

window.show_all();

Gtk.main();
