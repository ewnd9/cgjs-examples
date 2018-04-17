'use strict'

// transformed from /vendor/programmica-examples/progressbar.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');
const GLib = require('GLib');

Gtk.init(null);

function pulse_function() {
  if (progressbar.get_fraction() < 1.0)
    var value = progressbar.get_fraction() + 0.1;
  else var value = 0;

  progressbar.set_fraction(value);

  return true;
}

function on_checkbutton_toggled(checkbutton) {
  progressbar.set_show_text(checkbutton.get_active());
}

const window = new Gtk.Window();
window.set_title('ProgressBar');
window.connect('destroy', Gtk.main_quit);

const grid = new Gtk.Grid();
window.add(grid);

var progressbar = new Gtk.ProgressBar();
grid.attach(progressbar, 0, 0, 1, 1);

const checkbutton = new Gtk.CheckButton({ label: 'Show Text' });
checkbutton.connect('toggled', on_checkbutton_toggled);
grid.attach(checkbutton, 1, 0, 1, 1);

window.show_all();

GLib.timeout_add(GLib.PRIORITY_DEFAULT, 500, pulse_function);

Gtk.main();
