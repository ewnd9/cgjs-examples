'use strict'

// transformed from /vendor/optimisme-examples/egSearch.js by /scripts/transform.js
// (license unspecified)

const Gdk = require('Gdk');
const Gio = require('Gio');
const GLib = require('GLib');
const Gtk = require('Gtk');

class App {
  constructor() {
    this.title = 'Example Search';
    GLib.set_prgname(this.title);

    this.filterText = '';
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
      default_height: 325,
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
    let imageSearch;

    this.headerBar = new Gtk.HeaderBar();
    this.headerBar.set_show_close_button(true);

    imageSearch = new Gtk.Image({
      icon_name: 'edit-find-symbolic',
      icon_size: Gtk.IconSize.SMALL_TOOLBAR
    });
    this.buttonSearch = new Gtk.ToggleButton({ image: imageSearch });
    this.buttonSearch.connect('clicked', () => {
      if (this.buttonSearch.get_active()) {
        this.searchBar.set_search_mode(true);
      } else {
        this.searchBar.set_search_mode(false);
      }
    });

    this.headerBar.pack_end(this.buttonSearch);

    return this.headerBar;
  }

  getBody() {
    this.content = new Gtk.Grid();
    this.content.attach(this.getSearch(), 0, 0, 1, 1);
    this.content.attach(this.getFlow(), 0, 1, 1, 1);

    return this.content;
  }

  getSearch() {
    let searchEntry;

    this.searchBar = new Gtk.SearchBar();
    this.searchBar.show();
    searchEntry = new Gtk.SearchEntry();
    searchEntry.show();

    searchEntry.connect('search-changed', () => {
      this.filterText = searchEntry.get_text();
      this.flow.invalidate_filter();
    });
    this.window.connect('key-press-event', (widget, event) => {
      let key = event.get_keyval()[1];
      if (
        key !== Gdk.KEY_Escape &&
        key !== Gdk.KEY_Up &&
        key !== Gdk.KEY_Down &&
        key !== Gdk.KEY_Left &&
        key !== Gdk.KEY_Right
      ) {
        if (!this.buttonSearch.get_active()) {
          this.buttonSearch.set_active(true);
        }
      } else {
        this.buttonSearch.set_active(false);
      }
    });
    this.searchBar.connect_entry(searchEntry);
    this.searchBar.add(searchEntry);

    return this.searchBar;
  }

  getFlow() {
    let scroll;

    scroll = new Gtk.ScrolledWindow({ vexpand: true });
    this.flow = new Gtk.FlowBox({ vexpand: true });
    this.flow.set_filter_func(item => {
      return this.filter(item);
    });

    this.flow.insert(this.newFlowLabel('1a lorem'), -1);
    this.flow.insert(this.newFlowLabel('2b ipsum'), -1);
    this.flow.insert(this.newFlowLabel('3c dolor'), -1);
    this.flow.insert(this.newFlowLabel('4d sit set'), -1);
    this.flow.insert(this.newFlowLabel('5e amet'), -1);
    this.flow.insert(this.newFlowLabel('6f consectetur'), -1);
    this.flow.insert(this.newFlowLabel('7g adipiscing'), -1);
    this.flow.insert(this.newFlowLabel('8h elit'), -1);
    this.flow.insert(this.newFlowLabel('9i set'), -1);

    scroll.add(this.flow);
    return scroll;
  }

  newFlowLabel(text) {
    let label = new Gtk.Label({ label: text });

    label.set_size_request(125, 125);
    return label;
  }

  filter(item) {
    let label = item.get_child().get_label();

    if (this.filterText !== '') {
      if (label.indexOf(this.filterText) !== -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  printText(text) {
    print(text);
  }
}

//Run the application
let app = new App();
app.run(ARGV);
