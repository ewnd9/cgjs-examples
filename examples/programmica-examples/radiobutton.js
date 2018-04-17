'use strict'

// transformed from /vendor/programmica-examples/radiobutton.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

function on_radio_button_toggled(radiobutton) {
  if (radiobutton.get_active())
    print(`RadioButton ${radiobutton.value} toggled`);
}

const window = new Gtk.Window();
window.set_title('RadioButton');
window.connect('destroy', Gtk.main_quit);

const grid = new Gtk.Grid();
window.add(grid);

const radiobutton1 = new Gtk.RadioButton({ label: 'RadioButton 1' });
radiobutton1.value = 1;
radiobutton1.connect('toggled', function() {
  on_radio_button_toggled(radiobutton1);
});
grid.attach(radiobutton1, 0, 0, 1, 1);

const radiobutton2 = new Gtk.RadioButton({ label: 'RadioButton 2' });
radiobutton2.value = 2;
radiobutton2.connect('toggled', function() {
  on_radio_button_toggled(radiobutton2);
});
radiobutton2.join_group(radiobutton1);
grid.attach(radiobutton2, 0, 1, 1, 1);

window.show_all();

Gtk.main();
