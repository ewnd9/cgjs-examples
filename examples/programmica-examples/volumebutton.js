'use strict'

// transformed from /vendor/programmica-examples/volumebutton.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

function on_volume_changed(volumebutton) {
  print(`VolumeButton value: ${volumebutton.get_value()}`);
}

const window = new Gtk.Window();
window.set_title('VolumeButton');
window.set_default_size(200, 200);
window.connect('destroy', Gtk.main_quit);

const grid = new Gtk.Grid();
window.add(grid);

const volumebutton = new Gtk.VolumeButton();
volumebutton.set_value(5);
volumebutton.connect('value-changed', function() {
  on_volume_changed(volumebutton);
});
grid.attach(volumebutton, 0, 0, 1, 1);

window.show_all();

Gtk.main();
