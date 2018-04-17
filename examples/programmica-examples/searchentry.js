'use strict'

// transformed from /vendor/programmica-examples/searchentry.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

function on_search_entry_activated(searchentry) {
  print(`SearchEntry text: ${searchentry.get_text()}`);
}

const window = new Gtk.Window();
window.set_title('SearchEntry');
window.connect('destroy', Gtk.main_quit);

const searchentry = new Gtk.SearchEntry();
searchentry.connect('activate', function() {
  on_search_entry_activated(searchentry);
});
window.add(searchentry);

window.show_all();

Gtk.main();
