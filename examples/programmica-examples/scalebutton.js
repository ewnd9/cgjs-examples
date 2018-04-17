'use strict'

// transformed from /vendor/programmica-examples/scalebutton.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

function on_scale_changed(scalebutton) {
  print(`ScaleButton value: ${scalebutton.get_value()}`);
}

const window = new Gtk.Window();
window.set_title('ScaleButton');
window.set_default_size(200, 200);
window.connect('destroy', Gtk.main_quit);

const grid = new Gtk.Grid();
window.add(grid);

const scalebutton = new Gtk.ScaleButton();
scalebutton.set_value(5);
scalebutton.set_icons(['gtk-go-up', 'gtk-go-down']);
scalebutton.connect('value-changed', function() {
  on_scale_changed(scalebutton);
});
grid.attach(scalebutton, 0, 0, 1, 1);

window.show_all();

Gtk.main();
