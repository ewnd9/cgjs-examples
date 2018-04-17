'use strict'

// transformed from /vendor/programmica-examples/linkbutton.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

const window = new Gtk.Window();
window.set_title('LinkButton');
window.set_default_size(200, 200);
window.connect('destroy', Gtk.main_quit);

const linkbutton = new Gtk.LinkButton({ label: 'Programmica' });
linkbutton.set_uri('https://programmica.com/');
window.add(linkbutton);

window.show_all();

Gtk.main();
