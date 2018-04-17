'use strict'

// transformed from /vendor/programmica-examples/recentchooserdialog.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

const recentchooserdialog = new Gtk.RecentChooserDialog();
recentchooserdialog.set_title('RecentChooserDialog');
recentchooserdialog.add_button('_Cancel', Gtk.ResponseType.CANCEL);
recentchooserdialog.add_button('_Select', Gtk.ResponseType.OK);

if (recentchooserdialog.run() == Gtk.ResponseType.OK) {
  const uri = recentchooserdialog.get_current_uri();

  if (uri != null) {
    print(`Recent document selected: ${uri}`);
  }
}

recentchooserdialog.destroy();
