'use strict'

// transformed from /vendor/programmica-examples/placessidebar.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

function on_open_location(placessidebar, location, flags) {
  print(`Selected location: ${location.get_uri()}`);
}

const window = new Gtk.Window();
window.set_title('PlacesSidebar');
window.connect('destroy', Gtk.main_quit);

const placessidebar = new Gtk.PlacesSidebar();
placessidebar.connect('open-location', on_open_location);
window.add(placessidebar);

window.show_all();

Gtk.main();
