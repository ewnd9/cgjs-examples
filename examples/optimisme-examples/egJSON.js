'use strict'

// transformed from /vendor/optimisme-examples/egJSON.js by /scripts/transform.js
// (license unspecified)

const Gio = require('Gio');
const GLib = require('GLib');
const Gtk = require('Gtk');

// Import spawn library
//const Spawn = imports.assets.spawn;

class App {
  constructor() {
    this.title = 'Example JSON';
    GLib.set_prgname(this.title);

    this.info = {};
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
      default_width: 400,
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
    let buttonR, buttonW, grid;

    buttonR = new Gtk.Button({
      hexpand: true,
      halign: Gtk.Align.CENTER,
      label: 'Read JSON'
    });
    buttonR.connect('clicked', () => {
      this.read();
    });

    buttonW = new Gtk.Button({
      hexpand: true,
      halign: Gtk.Align.CENTER,
      label: 'Write JSON'
    });
    buttonW.connect('clicked', () => {
      this.write();
    });

    this.label = new Gtk.Label({ label: '' });

    grid = new Gtk.Grid({ column_spacing: 6, margin: 15, row_spacing: 6 });
    grid.attach(buttonR, 0, 0, 1, 1);
    grid.attach(buttonW, 1, 0, 1, 1);
    grid.attach(this.label, 0, 1, 2, 1);

    return grid;
  }

  read() {
    let file;

    file = Gio.File.new_for_path(`${__dirname}/assets/egJSON.json`);

    file.load_contents_async(null, (file, res) => {
      let contents;
      try {
        contents = file.load_contents_finish(res)[1].toString();
        this.info = JSON.parse(contents);
        if (typeof this.info['counter-read'] !== 'undefined') {
          this.info['counter-read'] = this.info['counter-read'] + 1;
        }
        this.label.set_text(JSON.stringify(this.info));
      } catch (e) {
        return;
      }
    });
  }

  write() {
    let text, file;

    if (
      typeof this.info['counter-read'] !== 'undefined' &&
      typeof this.info['counter-write'] !== 'undefined'
    ) {
      this.info['counter-write'] = this.info['counter-write'] + 1;
      text = JSON.stringify(this.info);

      file = Gio.File.new_for_path(`${__dirname}/assets/egJSON.json`);
      file.replace_async(
        null,
        false,
        Gio.FileCreateFlags.REPLACE_DESTINATION,
        GLib.PRIORITY_LOW,
        null,
        (file, res) => {
          let stream;
          if (!res.had_error()) {
            stream = file.replace_finish(res);
            stream.write(text, null);
            // Write more data with stream.write ...
            stream.close(null);
          }
        }
      );
    } else {
      this.label.set_text('Read the file first');
    }
  }
}

//Run the application
let app = new App();
app.run(ARGV);
