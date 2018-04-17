'use strict'

// transformed from /vendor/optimisme-examples/egEvent.js by /scripts/transform.js
// (license unspecified)

const Gio = require('Gio');
const GLib = require('GLib');
const Gtk = require('Gtk');
const Pango = require('Pango');

class App {
  constructor() {
    this.title = 'Example Event';
    GLib.set_prgname(this.title);

    this.text = 'Click here ... ';
    this.counter = 0;
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
    try {
      this.window.set_icon_from_file(`${__dirname}/assets/appIcon.png`);
    } catch (err) {
      this.window.set_icon_name('application-x-executable');
    }

    this.window.add(this.getBody());
  }

  getBody() {
    let event;

    this.label = new Gtk.Label({
      halign: Gtk.Align.CENTER,
      label: this.text,
      valign: Gtk.Align.CENTER
    });

    event = new Gtk.EventBox();
    event.add(this.label);
    event.connect('button-press-event', () => {
      this.counter = this.counter + 1;
      this.label.set_text(this.text + this.counter);
    });

    return event;
  }
}

//Run the application
let app = new App();
app.run(ARGV);
