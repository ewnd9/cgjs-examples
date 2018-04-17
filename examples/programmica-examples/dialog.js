'use strict'

// transformed from /vendor/programmica-examples/dialog.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

const dialog = new Gtk.Dialog();
dialog.set_title('Dialog');
dialog.set_default_size(200, 200);
dialog.add_button('_OK', Gtk.ResponseType.OK);
dialog.add_button('_Cancel', Gtk.ResponseType.CANCEL);

const response = dialog.run();

if (response == Gtk.ResponseType.OK) {
  print('OK button clicked');
} else if (response == Gtk.ResponseType.CANCEL) {
  print('Cancel button clicked');
}

dialog.destroy();
