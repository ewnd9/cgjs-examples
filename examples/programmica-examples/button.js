'use strict'

// transformed from /vendor/programmica-examples/button.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

function on_button_clicked() {
  print('Button clicked!');
}

const window = new Gtk.Window();
window.set_title('Button');
window.connect('destroy', Gtk.main_quit);

const button = new Gtk.Button({ label: 'Button' });
button.connect('clicked', on_button_clicked);
window.add(button);

window.show_all();

Gtk.main();
