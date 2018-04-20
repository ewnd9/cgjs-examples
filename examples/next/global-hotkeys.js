// inspired by https://github.com/rockon999/emoji-keyboard-gjs/blob/86e335c3d595af21df30ac7fb52a75ca87bf230b/src/main.js
imports.gi.versions.Keybinder = '3.0';

// $ sudo apt-get install libkeybinder-3.0-0 gir1.2-keybinder
const { Gtk, Keybinder }  = imports.gi;
const Lang = imports.lang;

const Keyboard = new Lang.Class({
  Name: 'Keyboard',
  Extends: Gtk.ApplicationWindow,
  _init(params) {
    this.parent(params);

    const hotkey = '<Super>X';
    Keybinder.init();
    const res = Keybinder.bind(hotkey, () => print(`${hotkey} click`));

    print(hotkey, res);
  }
});

const Application = new Lang.Class({
  Name: 'GlobalHotkeys',
  Extends: Gtk.Application,
  vfunc_activate() {
    this.keyboard = new Keyboard({ application: this });
  }
});

// // Prints the following without boilerplate: `gdk_keymap_get_for_display: assertion 'GDK_IS_DISPLAY (display)' failed`
// const hotkey = '<Super>X';
// Keybinder.init();
// const res = Keybinder.bind(hotkey, () => print(`${hotkey} click`));

new Application().run([]);
