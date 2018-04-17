'use strict'

// transformed from /vendor/programmica-examples/iconview.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');
const GdkPixbuf = require('GdkPixbuf');
const GObject = require('GObject');

Gtk.init(null);

function on_item_activated(iconview) {
  const model = iconview.get_model();

  for (let i = 0; i < iconview.get_selected_items().length; i++) {
    var treeiter = {};
    let success;
    const treeiter = model.get_iter(iconview.get_selected_items()[i], treeiter);
    const value = model.get_value(treeiter[1], 0);

    print(`Selected item: ${value}`);
  }
}

const window = new Gtk.Window();
window.set_title('IconView');
window.connect('destroy', Gtk.main_quit);

const liststore = new Gtk.ListStore();
liststore.set_column_types([
  GObject.TYPE_STRING,
  GdkPixbuf.Pixbuf,
  GObject.TYPE_STRING
]);

const image = new Gtk.Image();

const distributions = ['debian', 'fedora', 'mandriva', 'gentoo', 'mepis'];

for (let i = 0; i < distributions.length; i++) {
  image.set_from_file(`_resources/${distributions[i]}.ico`);

  const name =
    distributions[i].charAt(0).toUpperCase() + distributions[i].slice(1);
  const tooltip = `${name} tooltip example`;

  liststore.set(
    liststore.append(),
    [0, 1, 2],
    [name, image.get_pixbuf(), tooltip]
  );
}

const iconview = new Gtk.IconView();
iconview.set_model(liststore);
iconview.set_text_column(0);
iconview.set_pixbuf_column(1);
iconview.set_tooltip_column(2);
iconview.connect('item-activated', function() {
  on_item_activated(iconview);
});
window.add(iconview);

window.show_all();

Gtk.main();
