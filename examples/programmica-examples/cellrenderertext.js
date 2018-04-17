'use strict'

// transformed from /vendor/programmica-examples/cellrenderertext.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');
const GObject = require('GObject');

Gtk.init(null);

function on_cell_edited(cellrenderertext, treepath, text) {
  const [success, treeiter] = liststore.get_iter_from_string(treepath);
  liststore.set(treeiter, [1], [text]);
}

const window = new Gtk.Window();
window.set_title('CellRendererText');
window.connect('destroy', Gtk.main_quit);

var liststore = new Gtk.ListStore();
liststore.set_column_types([GObject.TYPE_STRING, GObject.TYPE_STRING]);
liststore.set(
  liststore.append(),
  [0, 1],
  ['Antergos', 'http://www.antergos.com/']
);
liststore.set(liststore.append(), [0, 1], ['Manjaro', 'http://manjaro.org/']);
liststore.set(liststore.append(), [0, 1], ['Chakra', 'http://chakraos.org/']);

const treeview = new Gtk.TreeView();
treeview.set_model(liststore);
window.add(treeview);

var cellrenderertext = new Gtk.CellRendererText();

var treeviewcolumn = new Gtk.TreeViewColumn({ title: 'Distribution' });
treeviewcolumn.pack_start(cellrenderertext, true);
treeviewcolumn.add_attribute(cellrenderertext, 'text', 0);
treeview.append_column(treeviewcolumn);

var cellrenderertext = new Gtk.CellRendererText();
cellrenderertext.editable = true;
cellrenderertext.connect('edited', on_cell_edited);

var treeviewcolumn = new Gtk.TreeViewColumn({ title: 'Website' });
treeviewcolumn.pack_start(cellrenderertext, true);
treeviewcolumn.add_attribute(cellrenderertext, 'text', 1);
treeview.append_column(treeviewcolumn);

window.show_all();

Gtk.main();
