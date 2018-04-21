'use strict'

// transformed from /vendor/programmica-examples/cellrenderertoggle.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');
const GObject = imports.gi.GObject;

Gtk.init(null);

function on_cell_toggled(cellrenderertoggle, treepath) {
  const active = !cellrenderertoggle.get_active();

  const [success, treeiter] = liststore.get_iter_from_string(treepath);
  liststore.set(treeiter, [1], [active]);
}

const window = new Gtk.Window();
window.set_title('CellRendererToggle');
window.connect('destroy', Gtk.main_quit);

const treeiter = {};

var liststore = new Gtk.ListStore();
liststore.set_column_types([GObject.TYPE_STRING, GObject.TYPE_BOOLEAN]);
liststore.set(liststore.append(), [0, 1], ['Ethernet', false]);
liststore.set(liststore.append(), [0, 1], ['Wireless', true]);
liststore.set(liststore.append(), [0, 1], ['Bluetooth', false]);
liststore.set(liststore.append(), [0, 1], ['Mobile', false]);

const treeview = new Gtk.TreeView();
treeview.set_model(liststore);
window.add(treeview);

const cellrenderertext = new Gtk.CellRendererText();

var treeviewcolumn = new Gtk.TreeViewColumn({ title: 'Connection Type' });
treeviewcolumn.pack_start(cellrenderertext, true);
treeviewcolumn.add_attribute(cellrenderertext, 'text', 0);
treeview.append_column(treeviewcolumn);

const cellrenderertoggle = new Gtk.CellRendererToggle();
cellrenderertoggle.connect('toggled', on_cell_toggled);

var treeviewcolumn = new Gtk.TreeViewColumn({ title: 'Status' });
treeviewcolumn.pack_start(cellrenderertoggle, true);
treeviewcolumn.add_attribute(cellrenderertoggle, 'active', 1);
treeview.append_column(treeviewcolumn);

window.show_all();

Gtk.main();
