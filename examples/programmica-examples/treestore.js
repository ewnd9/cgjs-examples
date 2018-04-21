'use strict'

// transformed from /vendor/programmica-examples/treestore.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');
const GObject = imports.gi.GObject;

Gtk.init(null);

var window = new Gtk.Window();
window.set_title('TreeStore');
window.set_default_size(200, 200);
window.connect('destroy', Gtk.main_quit);

var treestore = new Gtk.TreeStore();
treestore.set_column_types([GObject.TYPE_STRING]);

var treeiter = treestore.append(null);
treestore.set(treeiter, [0], ['English']);
var treeiter2 = treestore.append(treeiter, treeiter2);
treestore.set(treeiter2, [0], ['James Davis']);
var treeiter3 = treestore.append(treeiter, treeiter3);
treestore.set(treeiter3, [0], ['Mark Williams']);

var treeiter = treestore.append(null);
treestore.set(treeiter, [0], ['Science']);
var treeiter2 = treestore.append(treeiter, treeiter2);
treestore.set(treeiter2, [0], ['Bethany Scholes']);

var cellrenderertext = new Gtk.CellRendererText();
var treeview = new Gtk.TreeView();
treeview.set_headers_visible(false);
treeview.set_model(treestore);
window.add(treeview);

var treeviewcolumn = new Gtk.TreeViewColumn();
treeviewcolumn.pack_start(cellrenderertext, true);
treeviewcolumn.add_attribute(cellrenderertext, 'text', 0);
treeview.append_column(treeviewcolumn);

window.show_all();

Gtk.main();
