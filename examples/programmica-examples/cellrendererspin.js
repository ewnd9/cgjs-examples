'use strict'

// transformed from /vendor/programmica-examples/cellrendererspin.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');
const GObject = imports.gi.GObject;

Gtk.init(null);

function on_cell_edited(cellrendererspin, treepath, value) {
  const [success, treeiter] = liststore.get_iter_from_string(treepath);
  liststore.set(treeiter, [1], [value]);
}

const window = new Gtk.Window();
window.set_default_size(200, -1);
window.set_title('CellRendererSpin');
window.connect('destroy', Gtk.main_quit);

const treeiter = {};

var liststore = new Gtk.ListStore();
liststore.set_column_types([GObject.TYPE_STRING, GObject.TYPE_STRING]);
liststore.set(liststore.append(), [0, 1], ['Pencils', '4']);
liststore.set(liststore.append(), [0, 1], ['Compasses', '2']);
liststore.set(liststore.append(), [0, 1], ['Rulers', '1']);

const treeview = new Gtk.TreeView();
treeview.set_model(liststore);
window.add(treeview);

const cellrenderertext = new Gtk.CellRendererText();

var treeviewcolumn = new Gtk.TreeViewColumn({ title: 'Item' });
treeviewcolumn.pack_start(cellrenderertext, true);
treeviewcolumn.add_attribute(cellrenderertext, 'text', 0);
treeview.append_column(treeviewcolumn);

const adjustment = new Gtk.Adjustment({
  value: 0,
  lower: 0,
  upper: 10,
  step_increment: 1,
  page_increment: 2
});

const cellrendererspin = new Gtk.CellRendererSpin();
cellrendererspin.editable = true;
cellrendererspin.adjustment = adjustment;
cellrendererspin.connect('edited', on_cell_edited);

var treeviewcolumn = new Gtk.TreeViewColumn({ title: 'Quantity' });
treeviewcolumn.pack_start(cellrendererspin, true);
treeviewcolumn.add_attribute(cellrendererspin, 'text', 1);
treeview.append_column(treeviewcolumn);

window.show_all();

Gtk.main();
