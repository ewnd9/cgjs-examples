'use strict'

// transformed from /vendor/programmica-examples/accellabel.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');
const Gdk = require('Gdk');

Gtk.init(null);

function on_button_clicked() {
  print('Button clicked!');
}

const window = new Gtk.Window();
window.set_title('AccelLabel');
window.set_default_size(200, -1);
window.connect('destroy', Gtk.main_quit);

const grid = new Gtk.Grid();
grid.set_border_width(5);
grid.set_row_spacing(5);
grid.set_column_spacing(5);
window.add(grid);

const accelgroup = new Gtk.AccelGroup();
window.add_accel_group(accelgroup);

const accellabel = new Gtk.AccelLabel({ label: 'Button Accelerator:' });
accellabel.set_hexpand(true);
grid.attach(accellabel, 0, 0, 1, 1);

const button = new Gtk.Button({ label: 'Save' });
button.add_accelerator(
  'clicked',
  accelgroup,
  String.charCodeAt('s'),
  Gdk.ModifierType.CONTROL_MASK,
  Gtk.AccelFlags.VISIBLE
);
button.connect('clicked', function() {
  on_button_clicked();
});
accellabel.set_accel_widget(button);
grid.attach(button, 0, 1, 1, 1);

window.show_all();

Gtk.main();
