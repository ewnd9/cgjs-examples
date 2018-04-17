'use strict'

// transformed from /vendor/programmica-examples/liststore.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');
const GObject = require('GObject');

Gtk.init(null);

const window = new Gtk.Window();
window.set_title('ListStore');
window.set_default_size(200, 200);
window.connect('destroy', Gtk.main_quit);

const liststore = new Gtk.ListStore();
liststore.set_column_types([GObject.TYPE_STRING, GObject.TYPE_INT]);
liststore.set(liststore.append(), [0, 1], ['Apple', 5]);
liststore.set(liststore.append(), [0, 1], ['Orange', 4]);
liststore.set(liststore.append(), [0, 1], ['Banana', 2]);
liststore.set(liststore.append(), [0, 1], ['Kiwi', 1]);
liststore.set(liststore.append(), [0, 1], ['Pear', 4]);

const cellrenderertext = new Gtk.CellRendererText();
const treeview = new Gtk.TreeView();
treeview.set_model(liststore);
window.add(treeview);

var treeviewcolumn = new Gtk.TreeViewColumn({ title: 'Fruit' });
treeviewcolumn.pack_start(cellrenderertext, true);
treeviewcolumn.add_attribute(cellrenderertext, 'text', 0);
treeview.append_column(treeviewcolumn);

var treeviewcolumn = new Gtk.TreeViewColumn({ title: 'Quantity' });
treeviewcolumn.pack_start(cellrenderertext, true);
treeviewcolumn.add_attribute(cellrenderertext, 'text', 1);
treeview.append_column(treeviewcolumn);

window.show_all();

Gtk.main();
