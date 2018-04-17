'use strict'

// transformed from /vendor/programmica-examples/popover.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

function on_popover_launched() {
  popover.show_all();
}

const window = new Gtk.Window();
window.set_default_size(250, 250);
window.set_title('Popover');
window.connect('destroy', Gtk.main_quit);

var box = new Gtk.Box();
box.set_orientation(Gtk.Orientation.VERTICAL);
window.add(box);

const button = new Gtk.Button({ label: 'Popover Launcher' });
button.connect('clicked', on_popover_launched);
box.add(button);

var popover = new Gtk.Popover();
popover.set_position(Gtk.PositionType.RIGHT);
popover.set_relative_to(button);

var box = new Gtk.Box();
box.set_orientation(Gtk.Orientation.VERTICAL);
box.set_spacing(5);
popover.add(box);

const label = new Gtk.Label({ label: 'A Label Widget' });
box.add(label);

const checkbutton = new Gtk.CheckButton({ label: 'A CheckButton Widget' });
box.add(checkbutton);

const radiobutton = new Gtk.RadioButton({ label: 'A RadioButton Widget' });
box.add(radiobutton);

window.show_all();

Gtk.main();
