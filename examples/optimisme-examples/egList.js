'use strict'

// transformed from /vendor/optimisme-examples/egList.js by /scripts/transform.js
// (license unspecified)

const Gio = require('Gio');
const GLib = require('GLib');
const GObj = imports.gi.GObject;
const Gtk = require('Gtk');

class App {
  constructor() {
    this.title = 'Example List';
    GLib.set_prgname(this.title);
  }

  run(ARGV) {
    this.application = new Gtk.Application();
    this.application.connect('activate', () => {
      this.onActivate();
    });
    this.application.connect('startup', () => {
      this.onStartup();
    });
    this.application.run([]);
  }

  onActivate() {
    this.window.show_all();
  }

  onStartup() {
    this.buildUI();
  }

  buildUI() {
    this.window = new Gtk.ApplicationWindow({
      application: this.application,
      default_height: 300,
      default_width: 720,
      window_position: Gtk.WindowPosition.CENTER
    });
    try {
      this.window.set_icon_from_file(`${__dirname}/assets/appIcon.png`);
    } catch (err) {
      this.window.set_icon_name('application-x-executable');
    }

    this.window.set_titlebar(this.getHeader());
    this.window.add(this.getBody());
  }

  getHeader() {
    this.headerBar = new Gtk.HeaderBar();
    this.headerBar.set_show_close_button(true);
    return this.headerBar;
  }

  getBody() {
    let scroll, store, tree, col;

    scroll = new Gtk.ScrolledWindow({ vexpand: true });

    store = new Gtk.ListStore();
    store.set_column_types([
      GObj.TYPE_INT,
      GObj.TYPE_STRING,
      GObj.TYPE_STRING,
      GObj.TYPE_BOOLEAN
    ]);
    store.set(store.append(), [0, 1, 2, 3], [0, '0A', 'Name 0', false]);
    store.set(store.append(), [0, 1, 2, 3], [1, '1B', 'Name 1', false]);
    store.set(store.append(), [0, 1, 2, 3], [2, '2C', 'Name 2', false]);
    store.set(store.append(), [0, 1, 2, 3], [3, '3D', 'Name 3', false]);

    tree = new Gtk.TreeView({
      headers_visible: false,
      vexpand: true,
      hexpand: true
    });
    tree.set_model(store);
    scroll.add(tree);

    col = new Gtk.TreeViewColumn();
    tree.append_column(col);

    let text1 = new Gtk.CellRendererText();
    col.pack_start(text1, true);
    col.set_cell_data_func(text1, (col, cell, model, iter) => {
      this.cellFuncText1(col, cell, model, iter);
    });

    let text2 = new Gtk.CellRendererText();
    col.pack_start(text2, true);
    col.set_cell_data_func(text2, (col, cell, model, iter) => {
      this.cellFuncText2(col, cell, model, iter);
    });

    return scroll;
  }

  cellFuncText1(col, cell, model, iter) {
    cell.editable = false;
    cell.text = model.get_value(iter, 1);
  }

  cellFuncText2(col, cell, model, iter) {
    cell.editable = false;
    cell.text = model.get_value(iter, 2);
  }
}

//Run the application
let app = new App();
app.run(ARGV);
