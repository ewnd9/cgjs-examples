'use strict'

// transformed from /vendor/programmica-examples/flowbox.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

const window = new Gtk.Window();
window.set_title('FlowBox');
window.connect('destroy', Gtk.main_quit);

const flowbox = new Gtk.FlowBox();
window.add(flowbox);

for (let count = 1; count < 10; count++) {
  const label = new Gtk.Label({ label: `Label ${count}` });
  flowbox.insert(label, count);
}

window.show_all();

Gtk.main();
