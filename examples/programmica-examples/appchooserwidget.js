'use strict'

// transformed from /vendor/programmica-examples/appchooserwidget.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

function on_application_activated(appchooserwidget) {
  const info = appchooserwidget.get_app_info();
  print(`Selected application: ${info.get_name()}`);
}

const window = new Gtk.Window({ type: Gtk.WindowType.TOPLEVEL });
window.set_title('AppChooserWidget');
window.connect('destroy', Gtk.main_quit);

const appchooserwidget = new Gtk.AppChooserWidget({
  content_type: 'audio/ogg'
});
appchooserwidget.connect('application-activated', on_application_activated);
window.add(appchooserwidget);

window.show_all();

Gtk.main();
