'use strict'

// transformed from /vendor/programmica-examples/scale.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

function on_scale_changed(scale) {
  print(`Scale value: ${scale.get_value()}`);
}

const window = new Gtk.Window();
window.set_title('Scale');
window.set_default_size(200, -1);
window.connect('destroy', Gtk.main_quit);

const scale = new Gtk.Scale();
scale.set_range(0, 10);
scale.set_value(7);
scale.connect('value-changed', function() {
  on_scale_changed(scale);
});
window.add(scale);

window.show_all();

Gtk.main();
