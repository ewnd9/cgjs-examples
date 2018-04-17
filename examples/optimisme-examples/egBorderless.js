'use strict'

// transformed from /vendor/optimisme-examples/egBorderless.js by /scripts/transform.js
// (license unspecified)

const Gio = require('Gio');
const GLib = require('GLib');
const Gtk = require('Gtk');

class App {
  constructor() {
    this.title = 'Example Asset';
    GLib.set_prgname(this.title);

    this.button;
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
      title: this.title,
      default_height: 200,
      default_width: 200,
      window_position: Gtk.WindowPosition.CENTER
    });
    this.window.set_decorated(false);

    try {
      this.window.set_icon_from_file(`${__dirname}/assets/appIcon.png`);
    } catch (err) {
      this.window.set_icon_name('application-x-executable');
    }

    this.button = new Gtk.Button({ label: 'Close' });
    this.button.connect('clicked', () => {
      this.window.close();
    });
    this.window.add(this.button);
  }
}

//Run the application
let app = new App();
app.run(ARGV);
