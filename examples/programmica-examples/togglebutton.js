'use strict'

// transformed from /vendor/programmica-examples/togglebutton.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

function on_toggle_button_toggled(togglebutton) {
  if (togglebutton.get_active()) {
    print(`${togglebutton.get_label()} toggled on`);
  } else {
    print(`${togglebutton.get_label()} toggled off`);
  }
}

const window = new Gtk.Window();
window.set_title('ToggleButton');
window.connect('destroy', Gtk.main_quit);

const grid = new Gtk.Grid();
window.add(grid);

const togglebutton1 = new Gtk.ToggleButton({ label: 'ToggleButton 1' });
togglebutton1.value = 1;
togglebutton1.connect('toggled', function() {
  on_toggle_button_toggled(togglebutton1);
});
grid.attach(togglebutton1, 0, 0, 1, 1);
const togglebutton2 = new Gtk.ToggleButton({ label: 'ToggleButton 2' });
togglebutton2.value = 2;
togglebutton2.connect('toggled', function() {
  on_toggle_button_toggled(togglebutton2);
});
grid.attach(togglebutton2, 0, 1, 1, 1);
const togglebutton3 = new Gtk.ToggleButton({ label: 'ToggleButton 3' });
togglebutton3.value = 3;
togglebutton3.connect('toggled', function() {
  on_toggle_button_toggled(togglebutton3);
});
grid.attach(togglebutton3, 0, 2, 1, 1);

window.show_all();

Gtk.main();
