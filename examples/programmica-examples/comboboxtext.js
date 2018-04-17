'use strict'

// transformed from /vendor/programmica-examples/comboboxtext.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

function on_combobox_changed(combobox) {
  print(combobox.get_active_text());
}

const window = new Gtk.Window();
window.set_title('ComboBoxText');
window.connect('destroy', Gtk.main_quit);

const combobox = new Gtk.ComboBoxText();
combobox.append_text('Aintree');
combobox.append_text('Epsom Downs');
combobox.append_text('Kempton');
combobox.append_text('York');
combobox.append_text('Ripon');
combobox.set_active(0);
combobox.connect('changed', function() {
  on_combobox_changed(combobox);
});
window.add(combobox);

window.show_all();

Gtk.main();
