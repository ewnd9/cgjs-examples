'use strict'

// transformed from /vendor/programmica-examples/spinner.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

function on_button_start_clicked() {
  spinner.start();
}

function on_button_stop_clicked() {
  spinner.stop();
}

const window = new Gtk.Window();
window.set_title('Spinner');
window.set_default_size(200, 200);
window.connect('destroy', Gtk.main_quit);

const grid = new Gtk.Grid();
window.add(grid);

var spinner = new Gtk.Spinner();
spinner.set_vexpand(true);
spinner.set_hexpand(true);
grid.attach(spinner, 0, 0, 2, 1);

var button = new Gtk.Button({ label: 'Start' });
button.connect('clicked', on_button_start_clicked);
grid.attach(button, 0, 1, 1, 1);
var button = new Gtk.Button({ label: 'Stop' });
button.connect('clicked', on_button_stop_clicked);
grid.attach(button, 1, 1, 1, 1);

window.show_all();

Gtk.main();
