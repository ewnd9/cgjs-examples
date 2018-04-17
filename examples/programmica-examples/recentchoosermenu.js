'use strict'

// transformed from /vendor/programmica-examples/recentchoosermenu.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

function on_item_activated() {
  const uri = recentchoosermenu.get_current_uri();

  if (uri != null) {
    print(`Recent document selected: ${uri}`);
  }
}

const window = new Gtk.Window();
window.set_default_size(200, -1);
window.set_title('RecentChooserMenu');
window.connect('destroy', Gtk.main_quit);

const menubar = new Gtk.MenuBar();
window.add(menubar);

const menuitem = new Gtk.MenuItem({ label: 'Recent' });
menubar.add(menuitem);

var recentchoosermenu = new Gtk.RecentChooserMenu();
recentchoosermenu.connect('item-activated', on_item_activated);
menuitem.set_submenu(recentchoosermenu);

window.show_all();

Gtk.main();
