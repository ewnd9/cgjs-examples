'use strict'

// transformed from /vendor/optimisme-examples/egCss.js by /scripts/transform.js
// (license unspecified)

const Gio = require('Gio');
const GLib = require('GLib');
const Gtk = require('Gtk');

class App {
  constructor() {
    this.title = 'Example Css';
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
    let content, css1, label1, css2, label2;

    // CSS from source code
    css1 = new Gtk.CssProvider();
    css1.load_from_data(
      ' * { color: #0a0; font-size: 12px; background-color: rgba(0, 0, 0, 0.5); border-radius: 5px; }'
    );

    label1 = new Gtk.Label({
      halign: Gtk.Align.CENTER,
      label: 'Source code CSS',
      valign: Gtk.Align.CENTER
    });
    label1.get_style_context().add_provider(css1, 0);
    label1.set_size_request(150, 35);

    // CSS from .css file class
    css2 = new Gtk.CssProvider();
    css2.load_from_path(`${__dirname}/assets/egCss.css`);

    label2 = new Gtk.Label({
      halign: Gtk.Align.CENTER,
      label: 'CSS from file',
      valign: Gtk.Align.CENTER
    });
    label2.get_style_context().add_provider(css2, 0);
    label2.set_size_request(150, 35);

    content = new Gtk.Grid({
      halign: Gtk.Align.CENTER,
      column_spacing: 10,
      margin: 15,
      row_spacing: 10
    });
    content.attach(label1, 0, 0, 1, 1);
    content.attach(label2, 0, 1, 1, 1);

    return content;
  }
}

//Run the application
let app = new App();
app.run(ARGV);

// More information: https://thegnomejournal.wordpress.com/2011/03/15/styling-gtk-with-css/
