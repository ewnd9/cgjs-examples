'use strict'

// transformed from /vendor/programmica-examples/toolbar.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

const window = new Gtk.Window();
window.set_title('Toolbar');
window.set_default_size(-1, 200);
window.connect('destroy', Gtk.main_quit);

const grid = new Gtk.Grid();
window.add(grid);

const toolbar = new Gtk.Toolbar();
toolbar.set_vexpand(false);
toolbar.set_hexpand(true);
grid.attach(toolbar, 0, 0, 1, 1);

const toolbutton1 = new Gtk.ToolButton({ label: 'Play' });
toolbar.add(toolbutton1);

const toolbutton2 = new Gtk.ToggleToolButton({ label: 'Pause' });
toolbar.add(toolbutton2);

const toolbutton3 = new Gtk.RadioToolButton({ label: 'Rewind' });
toolbutton3.set_icon_name('gtk-media-rewind');
toolbar.add(toolbutton3);
const toolbutton4 = new Gtk.RadioToolButton({
  label: 'Fast Forward',
  group: toolbutton3
});
toolbutton4.set_icon_name('gtk-media-forward');
toolbar.add(toolbutton4);

const toolbutton5 = new Gtk.MenuToolButton({ label: 'History' });
toolbar.add(toolbutton5);
const menu = new Gtk.Menu();
toolbutton5.set_menu(menu);
const menuitem = new Gtk.MenuItem({ label: 'MenuItem' });
menu.append(menuitem);
menuitem.show();

window.show_all();

Gtk.main();
