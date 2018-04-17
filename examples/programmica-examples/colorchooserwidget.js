'use strict'

// transformed from /vendor/programmica-examples/colorchooserwidget.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

function on_color_activated(colorchooserwidget) {
  const rgba = colorchooserwidget.get_rgba();
  print(`Red: ${rgba.red}`);
  print(`Green: ${rgba.green}`);
  print(`Blue: ${rgba.blue}`);
}

const window = new Gtk.Window();
window.set_title('ColorChooserWidget');
window.set_border_width(5);
window.connect('destroy', Gtk.main_quit);

const colorchooserwidget = new Gtk.ColorChooserWidget();
colorchooserwidget.set_use_alpha(true);
colorchooserwidget.connect('color-activated', function() {
  on_color_activated(colorchooserwidget);
});
window.add(colorchooserwidget);

window.show_all();

Gtk.main();
