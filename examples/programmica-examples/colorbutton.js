'use strict'

// transformed from /vendor/programmica-examples/colorbutton.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

function on_color_set(colorbutton) {
  const rgba = colorbutton.get_rgba();
  print(`Red: ${rgba.red}`);
  print(`Green: ${rgba.green}`);
  print(`Blue: ${rgba.blue}`);
}

const window = new Gtk.Window();
window.set_default_size(200, -1);
window.set_title('ColorButton');
window.connect('destroy', Gtk.main_quit);

const colorbutton = new Gtk.ColorButton();
colorbutton.set_use_alpha(true);
colorbutton.connect('color-set', on_color_set);
window.add(colorbutton);

window.show_all();

Gtk.main();
