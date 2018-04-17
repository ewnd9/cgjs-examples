'use strict'

// transformed from /vendor/programmica-examples/revealer.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

function on_button_clicked(widget) {
  if (revealer.get_reveal_child()) revealer.set_reveal_child(false);
  else revealer.set_reveal_child(true);
}

const window = new Gtk.Window();
window.set_title('Revealer');
window.set_default_size(200, 200);
window.connect('destroy', Gtk.main_quit);

const box = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL });
window.add(box);

var revealer = new Gtk.Revealer();
revealer.set_vexpand(true);
box.pack_start(revealer, false, false, 0);

const label = new Gtk.Label({ label: 'Label contained within\na Revealer' });
revealer.add(label);

const button = new Gtk.Button({ label: 'Reveal' });
button.connect('clicked', function() {
  on_button_clicked(button);
});
box.pack_start(button, false, false, 0);

window.show_all();

Gtk.main();
