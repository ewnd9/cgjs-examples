'use strict'

// transformed from /vendor/optimisme-examples/egJustify.js by /scripts/transform.js
// (license unspecified)

const Gio = require('Gio');
const GLib = require('GLib');
const Gtk = require('Gtk');
const Pango = require('Pango');

class App {
  constructor() {
    this.title = 'Example Justify';
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
    let left, center, right, justify, grid;

    left = this.getLabel(Gtk.Justification.LEFT);
    center = this.getLabel(Gtk.Justification.CENTER);
    right = this.getLabel(Gtk.Justification.RIGHT);
    justify = this.getLabel(Gtk.Justification.FILL);

    grid = new Gtk.Grid({ column_spacing: 25 });
    grid.set_border_width(15);
    grid.attach(left, 0, 0, 1, 1);
    grid.attach(center, 1, 0, 1, 1);
    grid.attach(right, 2, 0, 1, 1);
    grid.attach(justify, 3, 0, 1, 1);

    return grid;
  }

  getLabel(justification) {
    let text, label;

    text =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt';

    label = new Gtk.Label({
      halign: Gtk.Align.CENTER,
      label: text,
      valign: Gtk.Align.START
    });
    label.set_size_request(100, -1);
    label.set_ellipsize(Pango.EllipsizeMode.END);
    label.set_max_width_chars(10);
    label.set_line_wrap(true);
    label.set_justify(justification);
    label.set_lines(6);

    return label;
  }
}

//Run the application
let app = new App();
app.run(ARGV);
