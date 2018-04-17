'use strict'

// transformed from /vendor/programmica-examples/searchbar.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

function on_search_bar_toggled() {
  searchbar.set_search_mode(checkbutton.get_active());
}

const window = new Gtk.Window();
window.set_title('SearchBar');
window.connect('destroy', Gtk.main_quit);

const box = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL });
window.add(box);

var checkbutton = new Gtk.CheckButton({ label: 'SearchBar visible' });
checkbutton.connect('toggled', on_search_bar_toggled);
box.add(checkbutton);

var searchbar = new Gtk.SearchBar();
searchbar.set_search_mode(false);
box.add(searchbar);

const searchentry = new Gtk.SearchEntry();
searchbar.add(searchentry);

window.show_all();

Gtk.main();
