'use strict'

// transformed from /vendor/programmica-examples/filechooserbutton.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

function on_file_set() {
  print(`Selected file: ${filechooserbutton.get_filename()}`);
}

const window = new Gtk.Window();
window.set_default_size(200, -1);
window.set_title('FileChooserButton');
window.connect('destroy', Gtk.main_quit);

var filechooserbutton = new Gtk.FileChooserButton();
filechooserbutton.connect('file-set', on_file_set);
window.add(filechooserbutton);

window.show_all();

Gtk.main();
