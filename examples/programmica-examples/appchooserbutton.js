'use strict'

// transformed from /vendor/programmica-examples/appchooserbutton.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

function on_app_chooser_changed(appchooserbutton) {
  const info = appchooserbutton.get_app_info();
  print(`Selected application: ${info.get_name()}`);
}

const window = new Gtk.Window();
window.set_title('AppChooserButton');
window.set_default_size(200, -1);
window.connect('destroy', Gtk.main_quit);

const appchooserbutton = new Gtk.AppChooserButton({
  content_type: 'text/plain'
});
appchooserbutton.connect('changed', on_app_chooser_changed);
window.add(appchooserbutton);

window.show_all();

Gtk.main();
