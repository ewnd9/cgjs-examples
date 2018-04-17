'use strict'

// transformed from /vendor/programmica-examples/appchooserdialog.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

const appchooserdialog = new Gtk.AppChooserDialog({
  content_type: 'text/plain'
});
appchooserdialog.set_title('AppChooserDialog');
const response = appchooserdialog.run();

if (response == Gtk.ResponseType.OK) {
  const info = appchooserdialog.get_app_info();
  print(`Selected application: ${info.get_name()}`);
}

appchooserdialog.destroy();
