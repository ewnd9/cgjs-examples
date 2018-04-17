'use strict'

// transformed from /vendor/programmica-examples/checkbutton.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

function on_check_button_toggled(checkbutton) {
  if (checkbutton.get_active()) {
    const label = checkbutton.get_label();
    print(`${label} is present`);
  }
}

const window = new Gtk.Window();
window.set_title('CheckButton');
window.connect('destroy', Gtk.main_quit);

const grid = new Gtk.Grid();
window.add(grid);

const checkbutton1 = new Gtk.CheckButton({ label: 'Kylie' });
checkbutton1.connect('toggled', function() {
  on_check_button_toggled(checkbutton1);
});
grid.attach(checkbutton1, 0, 0, 1, 1);
const checkbutton2 = new Gtk.CheckButton({ label: 'Samantha' });
checkbutton2.connect('toggled', function() {
  on_check_button_toggled(checkbutton2);
});
grid.attach(checkbutton2, 0, 1, 1, 1);
const checkbutton3 = new Gtk.CheckButton({ label: 'Becky' });
checkbutton3.connect('toggled', function() {
  on_check_button_toggled(checkbutton3);
});
grid.attach(checkbutton3, 0, 2, 1, 1);

window.show_all();

Gtk.main();
