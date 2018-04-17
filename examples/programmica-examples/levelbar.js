'use strict'

// transformed from /vendor/programmica-examples/levelbar.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

function on_increase_clicked() {
  const value = levelbar.get_value();

  if (value < levelbar.get_max_value()) {
    levelbar.set_value(value + 1);
  }
}

function on_decrease_clicked() {
  const value = levelbar.get_value();

  if (value > levelbar.get_min_value()) {
    levelbar.set_value(value - 1);
  }
}

const window = new Gtk.Window();
window.set_title('LevelBar');
window.connect('destroy', Gtk.main_quit);

const grid = new Gtk.Grid();
grid.set_column_homogeneous(true);
window.add(grid);

var levelbar = new Gtk.LevelBar();
levelbar.set_min_value(0);
levelbar.set_max_value(10);
grid.attach(levelbar, 0, 0, 2, 1);

const buttonIncrease = new Gtk.Button({ label: 'Increase' });
buttonIncrease.connect('clicked', on_increase_clicked);
grid.attach(buttonIncrease, 0, 1, 1, 1);

const buttonDecrease = new Gtk.Button({ label: 'Decrease' });
buttonDecrease.connect('clicked', on_decrease_clicked);
grid.attach(buttonDecrease, 1, 1, 1, 1);

window.show_all();

Gtk.main();
