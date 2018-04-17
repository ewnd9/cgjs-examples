'use strict'

// transformed from /vendor/programmica-examples/buttonbox.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

const window = new Gtk.Window();
window.set_title('ButtonBox');
window.connect('destroy', Gtk.main_quit);

const buttonbox = new Gtk.ButtonBox();
buttonbox.set_spacing(5);
window.add(buttonbox);

var button = new Gtk.Button({ label: 'Button 1' });
buttonbox.add(button);
var button = new Gtk.Button({ label: 'Button 2' });
buttonbox.add(button);
var button = new Gtk.Button({ label: 'Button 3' });
buttonbox.add(button);
buttonbox.set_child_secondary(button, true);

window.show_all();

Gtk.main();
