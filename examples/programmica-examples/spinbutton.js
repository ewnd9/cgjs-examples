'use strict'

// transformed from /vendor/programmica-examples/spinbutton.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

function on_spin_button_changed(spinbutton) {
  print(`SpinButton value: ${spinbutton.get_value_as_int()}`);
}

const window = new Gtk.Window();
window.set_title('SpinButton');
window.connect('destroy', Gtk.main_quit);

const spinbutton = new Gtk.SpinButton();
spinbutton.set_range(0, 10);
spinbutton.set_increments(1, 10);
spinbutton.set_value(3);
spinbutton.connect('value-changed', function() {
  on_spin_button_changed(spinbutton);
});
window.add(spinbutton);

window.show_all();

Gtk.main();
