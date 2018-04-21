'use strict'

// transformed from /vendor/programmica-examples/combobox.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');
const GObject = imports.gi.GObject;

Gtk.init(null);

function on_combobox_changed(combobox) {
  const [success, treeiter] = combobox.get_active_iter();

  if (success) {
    const manufacturer = liststore.get_value(treeiter, 0);
    print(`Selected item: ${manufacturer}`);
  }
}

const window = new Gtk.Window();
window.set_title('ComboBox');
window.connect('destroy', Gtk.main_quit);

var liststore = new Gtk.ListStore();
liststore.set_column_types([GObject.TYPE_STRING]);
liststore.set(liststore.append(), [0], ['Volkswagen']);
liststore.set(liststore.append(), [0], ['Audi']);
liststore.set(liststore.append(), [0], ['Ford']);
liststore.set(liststore.append(), [0], ['Vauxhall']);
liststore.set(liststore.append(), [0], ['Mercedes']);

const cellrenderertext = new Gtk.CellRendererText();

const combobox = new Gtk.ComboBox();
combobox.set_model(liststore);
combobox.pack_start(cellrenderertext, true);
combobox.add_attribute(cellrenderertext, 'text', 0);
combobox.set_active(1);
combobox.connect('changed', function() {
  on_combobox_changed(combobox);
});
window.add(combobox);

window.show_all();

Gtk.main();
