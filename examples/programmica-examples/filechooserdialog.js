'use strict'

// transformed from /vendor/programmica-examples/filechooserdialog.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

const filechooserdialog = new Gtk.FileChooserDialog();
filechooserdialog.set_title('FileChooserDialog');
filechooserdialog.add_button('Cancel', Gtk.ResponseType.CLOSE);
filechooserdialog.add_button('Select', Gtk.ResponseType.OK);
filechooserdialog.set_default_response(Gtk.ResponseType.OK);

const response = filechooserdialog.run();

if (response == Gtk.ResponseType.OK) {
  print(`Selected file: ${filechooserdialog.get_filename()}`);
}

filechooserdialog.destroy();
