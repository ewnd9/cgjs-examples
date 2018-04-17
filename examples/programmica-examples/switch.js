'use strict'

// transformed from /vendor/programmica-examples/switch.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

function on_switch_toggled(gtkswitch) {
  if (gtkswitch.get_active()) {
    print(`Switch ${gtkswitch.id} toggled on`);
  } else {
    print(`Switch ${gtkswitch.id} toggled off`);
  }
}

const window = new Gtk.Window();
window.set_title('Switch');
window.connect('destroy', Gtk.main_quit);

const buttonbox = new Gtk.ButtonBox({
  orientation: Gtk.Orientation.VERTICAL,
  spacing: 5
});
window.add(buttonbox);

const switch1 = new Gtk.Switch();
switch1.id = 1;
switch1.connect('notify::active', function() {
  on_switch_toggled(switch1);
});
buttonbox.add(switch1);
const switch2 = new Gtk.Switch();
switch2.id = 2;
switch2.connect('notify::active', function() {
  on_switch_toggled(switch2);
});
buttonbox.add(switch2);

window.show_all();

Gtk.main();
