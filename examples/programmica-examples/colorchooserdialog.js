'use strict'

// transformed from /vendor/programmica-examples/colorchooserdialog.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

const colorchooserdialog = new Gtk.ColorChooserDialog();
colorchooserdialog.set_title('ColorChooserDialog');
colorchooserdialog.set_use_alpha(true);

if (colorchooserdialog.run() == Gtk.ResponseType.OK) {
  const rgba = colorchooserdialog.get_rgba();
  print(`Red: ${rgba.red}`);
  print(`Green: ${rgba.green}`);
  print(`Blue: ${rgba.blue}`);
}

colorchooserdialog.destroy();
