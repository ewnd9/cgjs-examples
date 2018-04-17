'use strict'

// transformed from /vendor/optimisme-examples/egSpawn.js by /scripts/transform.js
// (license unspecified)

const Gio = require('Gio');
const GLib = require('GLib');
const Gtk = require('Gtk');

// Import spawn library
const Spawn = require('./assets/spawn');

class App {
  constructor() {
    this.title = 'Example Spawn';
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
    this.spawn();
  }

  buildUI() {
    let scroll;

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

    scroll = new Gtk.ScrolledWindow({ vexpand: true });
    this.buffer = new Gtk.TextBuffer();
    this.buffer.insert_at_cursor('Result:\n', -1);
    this.view = new Gtk.TextView();
    this.view.set_buffer(this.buffer);

    scroll.add(this.view);
    this.window.add(scroll);
  }

  spawn() {
    let reader;

    reader = new Spawn.SpawnReader();
    reader.spawn('./', ['ls', '-ltr', '.'], line => {
      this.buffer.insert_at_cursor(`${String(line)}\n`, -1);
    });

    /*  // Example of 'continuous' read with 'tail':
        reader.spawn('./', ['tail', '-f', 'a.txt'], (line) => {
            this.buffer.insert_at_cursor(String(line) + '\n', -1);
        });
    */
  }
}

//Run the application
let app = new App();
app.run(ARGV);
