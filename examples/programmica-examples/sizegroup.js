'use strict'

// transformed from /vendor/programmica-examples/sizegroup.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

const window = new Gtk.Window();
window.set_title('SizeGroup');
window.connect('destroy', Gtk.main_quit);

const grid = new Gtk.Grid();
window.add(grid);

const sizegroup = new Gtk.SizeGroup();
sizegroup.set_mode(Gtk.SizeGroupMode.BOTH);

var button = new Gtk.Button({ label: 'Asia' });
sizegroup.add_widget(button);
grid.attach(button, 0, 0, 1, 1);
var button = new Gtk.Button({ label: 'Europe' });
sizegroup.add_widget(button);
grid.attach(button, 0, 1, 1, 1);
var button = new Gtk.Button({ label: 'North\nAmerica' });
sizegroup.add_widget(button);
grid.attach(button, 0, 2, 1, 1);

window.show_all();

Gtk.main();
