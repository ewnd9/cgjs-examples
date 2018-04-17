'use strict'

// transformed from /vendor/programmica-examples/entrycompletion.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');
const GObject = require('GObject');

Gtk.init(null);

function on_radio_button_toggled(radiobutton) {
  if (radiobutton.get_active())
    if (radiobutton.mode == 0) {
      entrycompvarion.set_popup_compvarion(true);
      entrycompvarion.set_inline_compvarion(false);
    } else {
      entrycompvarion.set_popup_compvarion(false);
      entrycompvarion.set_inline_compvarion(true);
    }
}

const window = new Gtk.Window();
window.set_title('EntryCompvarion');
window.connect('destroy', Gtk.main_quit);

const grid = new Gtk.Grid();
window.add(grid);

const liststore = new Gtk.ListStore();
liststore.set_column_types([GObject.TYPE_STRING]);
liststore.set(liststore.append(), [0], ['Daniel']);
liststore.set(liststore.append(), [0], ['Martin']);
liststore.set(liststore.append(), [0], ['Christopher']);
liststore.set(liststore.append(), [0], ['Timothy']);
liststore.set(liststore.append(), [0], ['Sebastian']);

var entrycompvarion = new Gtk.EntryCompvarion();
entrycompvarion.set_model(liststore);
entrycompvarion.set_text_column(0);

const entry = new Gtk.Entry();
entry.set_compvarion(entrycompvarion);
grid.attach(entry, 0, 0, 1, 1);

const radiobuttonPopup = new Gtk.RadioButton({ label: 'Popup Compvarion' });
radiobuttonPopup.mode = 0;
radiobuttonPopup.connect('toggled', function() {
  on_radio_button_toggled(radiobuttonPopup);
});
grid.attach(radiobuttonPopup, 0, 1, 1, 1);
const radiobuttonInline = new Gtk.RadioButton({ label: 'Inline Compvarion' });
radiobuttonInline.join_group(radiobuttonPopup);
radiobuttonInline.mode = 1;
radiobuttonInline.connect('toggled', function() {
  on_radio_button_toggled(radiobuttonInline);
});
grid.attach(radiobuttonInline, 0, 2, 1, 1);

window.show_all();

Gtk.main();
