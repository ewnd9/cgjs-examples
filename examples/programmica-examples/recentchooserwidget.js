'use strict'

// transformed from /vendor/programmica-examples/recentchooserwidget.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

function on_item_activated() {
  const uri = recentchooserwidget.get_current_uri();

  if (uri != null) {
    print(`Recent document selected: ${uri}`);
  }
}

const window = new Gtk.Window();
window.set_default_size(300, -1);
window.set_title('RecentChooserWidget');
window.connect('destroy', Gtk.main_quit);

var recentchooserwidget = new Gtk.RecentChooserWidget();
recentchooserwidget.connect('item-activated', on_item_activated);
window.add(recentchooserwidget);

window.show_all();

Gtk.main();
