'use strict'

// transformed from /vendor/optimisme-examples/egIcon.js by /scripts/transform.js
// (license unspecified)

const Gio = require('Gio');
const GLib = require('GLib');
const Gtk = require('Gtk');

class App {
  constructor() {
    this.title = 'Example Icon';
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
    let result = false,
      str =
        ' In Wayland there is no \n such thing as a window icon, \n the application icon must \n be set from the .desktop file';

    this.window = new Gtk.ApplicationWindow({
      application: this.application,
      title: this.title,
      default_height: 200,
      default_width: 200,
      window_position: Gtk.WindowPosition.CENTER
    });
    try {
      this.window.set_icon_from_file(`${__dirname}/assets/appIcon.png`);
    } catch (err) {
      this.window.set_icon_name('application-x-executable');
    }
    log(str);

    this.label = new Gtk.Label({ label: str });
    this.window.add(this.label);
  }
}

//Run the application
let app = new App();
app.run(ARGV);
