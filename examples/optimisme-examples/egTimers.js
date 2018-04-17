'use strict'

// transformed from /vendor/optimisme-examples/egTimers.js by /scripts/transform.js
// (license unspecified)

const Gio = require('Gio');
const GLib = require('GLib');
const Gtk = require('Gtk');

// Import the application library
const Timers = require('./assets/timers');

class App {
  constructor() {
    this.title = 'Example Timers';
    GLib.set_prgname(this.title);

    this.idTimeout;
    this.idInterval;
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

    this.window.add(this.getBody());
  }

  getBody() {
    let grid, buttonST, buttonCT, buttonSI, buttonCI;

    grid = new Gtk.Grid({ column_spacing: 6, row_spacing: 6 });
    grid.set_border_width(8);

    buttonST = new Gtk.Button({ label: 'setTimeout' });
    buttonST.connect('clicked', () => {
      this.actionSetTimeout();
    });

    this.buttonCT = new Gtk.Button({ label: 'clearTimeout' });
    this.buttonCT.connect('clicked', () => {
      this.actionClearTimeout();
    });
    this.buttonCT.set_sensitive(false);

    this.labelS = new Gtk.Label({ label: '-' });
    this.labelS.set_size_request(200, -1);

    buttonSI = new Gtk.Button({ label: 'setInterval' });
    buttonSI.connect('clicked', () => {
      this.actionSetInterval();
    });

    this.buttonCI = new Gtk.Button({ label: 'clearInterval' });
    this.buttonCI.connect('clicked', () => {
      this.actionClearInterval();
    });
    this.buttonCI.set_sensitive(false);

    this.labelC = new Gtk.Label({ label: '-' });
    this.labelC.set_size_request(200, -1);

    grid.attach(buttonST, 0, 0, 1, 1);
    grid.attach(this.buttonCT, 1, 0, 1, 1);
    grid.attach(this.labelS, 2, 0, 1, 1);
    grid.attach(buttonSI, 0, 1, 1, 1);
    grid.attach(this.buttonCI, 1, 1, 1, 1);
    grid.attach(this.labelC, 2, 1, 1, 1);

    return grid;
  }

  actionSetTimeout() {
    this.buttonCT.set_sensitive(true);
    this.labelS.set_text('Wait 2s');
    this.idTimeout = Timers.setTimeout(() => {
      this.buttonCT.set_sensitive(false);
      this.labelS.set_text('Now');
    }, 2000);
  }

  actionClearTimeout() {
    this.buttonCT.set_sensitive(false);
    this.labelS.set_text('-');
    Timers.clearTimeout(this.idTimeout);
  }

  actionSetInterval() {
    this.buttonCI.set_sensitive(true);
    this.labelC.set_text('Wait');
    this.counter = 0;
    this.idInterval = Timers.setInterval(() => {
      this.counter = this.counter + 1;
      this.labelC.set_text(this.counter.toString());
    }, 500);
  }

  actionClearInterval() {
    this.buttonCI.set_sensitive(false);
    this.labelC.set_text('-');
    Timers.clearInterval(this.idInterval);
  }
}

//Run the application
let app = new App();
app.run(ARGV);
