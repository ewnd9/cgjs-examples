'use strict'

// transformed from /vendor/optimisme-examples/egWebmsg.js by /scripts/transform.js
// (license unspecified)

const Gio = require('Gio');
const GLib = require('GLib');
const Gtk = require('Gtk');
const Webkit = imports.gi.WebKit;

class App {
  constructor() {
    this.title = 'Example Webmsg';
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
    let webView, button, label, grid;

    webView = new Webkit.WebView({ vexpand: true });
    webView.load_uri(
      GLib.filename_to_uri(`${__dirname}/assets/egWebmsg.html`, null)
    );
    webView.connect('status_bar_text_changed', (arg, txt) => {
      // Get Webkit messages into GTK listening to 'status bar/window.status' signals
      label.label = txt;
    });

    button = new Gtk.Button({ label: 'GTK to Webkit message' });
    button.connect('clicked', () => {
      // Execute one Webkit function to send a message from GTK to Webkit
      webView.execute_script('messageFromGTK("Message from GTK!");');
    });

    label = new Gtk.Label({ label: '' });

    grid = new Gtk.Grid({ column_homogeneous: true });
    grid.attach(webView, 0, 0, 2, 1);
    grid.attach(button, 0, 1, 1, 1);
    grid.attach(label, 1, 1, 1, 1);

    return grid;
  }
}

//Run the application
let app = new App();
app.run(ARGV);
