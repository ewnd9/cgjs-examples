'use strict'

// transformed from /vendor/programmica-examples/treemodelfilter.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');
const GObject = imports.gi.GObject;

Gtk.init(null);

function on_present_toggled(checkbutton) {
  treemodelfilter.refilter();
}

function filter_visible(model, treeiter, data) {
  let visible = true;

  if (checkbutton.get_active())
    if (model.get_value(treeiter, 1) < 70) visible = false;

  return visible;
}

const window = new Gtk.Window();
window.set_title('TreeModelFilter');
window.set_default_size(200, 200);
window.connect('destroy', Gtk.main_quit);

const grid = new Gtk.Grid();
window.add(grid);

const liststore = new Gtk.ListStore();
liststore.set_column_types([GObject.TYPE_STRING, GObject.TYPE_INT]);

const students = [
  { name: 'Andrew', exam: 65 },
  { name: 'Marcus', exam: 93 },
  { name: 'Timothy', exam: 48 },
  { name: 'Lucas', exam: 77 },
  { name: 'Fred', exam: 72 }
];

for (let i = 0; i < students.length; i++) {
  liststore.set(
    liststore.append(),
    [0, 1],
    [students[i].name, students[i].exam]
  );
}

var checkbutton = new Gtk.CheckButton({ label: 'Show Only Passing Scores' });
checkbutton.connect('toggled', on_present_toggled);
grid.attach(checkbutton, 0, 1, 1, 1);

var treemodelfilter = liststore.filter_new(null);
treemodelfilter.set_visible_func(filter_visible);

const treeview = new Gtk.TreeView();
treeview.set_hexpand(true);
treeview.set_vexpand(true);
treeview.set_model(treemodelfilter);
grid.attach(treeview, 0, 0, 1, 1);

const cellrenderertext = new Gtk.CellRendererText();

var treeviewcolumn = new Gtk.TreeViewColumn({ title: 'Student' });
treeviewcolumn.pack_start(cellrenderertext, true);
treeviewcolumn.add_attribute(cellrenderertext, 'text', 0);
treeview.append_column(treeviewcolumn);

var treeviewcolumn = new Gtk.TreeViewColumn({ title: 'Exam' });
treeviewcolumn.pack_start(cellrenderertext, true);
treeviewcolumn.add_attribute(cellrenderertext, 'text', 1);
treeview.append_column(treeviewcolumn);

window.show_all();

Gtk.main();
