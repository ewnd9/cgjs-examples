'use strict'

// transformed from /vendor/programmica-examples/statusbar.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

function on_push_clicked() {
  on_push_clicked.count++;

  const message = `Message number ${on_push_clicked.count}`;
  statusbar.push(on_push_clicked.context, message);
}

function on_pop_clicked() {
  statusbar.pop(on_pop_clicked.context);
}

function on_remove_all_clicked() {
  statusbar.remove_all(on_remove_all_clicked.context);
}

on_push_clicked.count = 0;

const window = new Gtk.Window();
window.set_title('Statusbar');
window.connect('destroy', Gtk.main_quit);

const grid = new Gtk.Grid();
grid.set_column_homogeneous(true);
window.add(grid);

const buttonPush = new Gtk.Button({ label: 'Push' });
buttonPush.connect('clicked', on_push_clicked);
grid.attach(buttonPush, 0, 0, 1, 1);

const buttonPop = new Gtk.Button({ label: 'Pop' });
buttonPop.connect('clicked', on_pop_clicked);
grid.attach(buttonPop, 1, 0, 1, 1);

const buttonRemoveAll = new Gtk.Button({ label: 'Remove All' });
buttonRemoveAll.connect('clicked', on_remove_all_clicked);
grid.attach(buttonRemoveAll, 2, 0, 1, 1);

var statusbar = new Gtk.Statusbar();
on_push_clicked.context = statusbar.get_context_id('example');
on_pop_clicked.context = on_push_clicked.context;
on_remove_all_clicked.context = on_push_clicked.context;
grid.attach(statusbar, 0, 1, 3, 1);

window.show_all();

Gtk.main();
