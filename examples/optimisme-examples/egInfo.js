'use strict'

// transformed from /vendor/optimisme-examples/egInfo.js by /scripts/transform.js
// (license unspecified)

const Gio = require('Gio');
const GLib = require('GLib');
const Gtk = require('Gtk');

// Import spawn library
const Spawn = require('./assets/spawn');

class App {
  constructor() {
    this.title = 'Example Info';
    GLib.set_prgname(this.title);

    this.info = {
      desktop: '',
      host: '',
      user: '',
      lang: '',
      home: '',
      installed: '',
      program: '',
      script: '',
      folder: '',
      current: '',
      icon: '',
      dstr: '',
      kernel: ''
    };
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
    this.getInfo();
  }

  buildUI() {
    this.window = new Gtk.ApplicationWindow({
      application: this.application,
      title: this.title,
      default_height: 400,
      default_width: 400,
      window_position: Gtk.WindowPosition.CENTER
    });
    try {
      this.info.icon = '/assets/appIcon.png';
      this.window.set_icon_from_file(__dirname + this.info.icon);
    } catch (err) {
      this.info.icon = 'application-x-executable';
      this.window.set_icon_name(this.info.icon);
    }

    this.label = new Gtk.Label({ label: '', margin: 15 });
    this.window.add(this.label);
  }

  getInfo() {
    let file, reader1, reader2;

    file = getAppFileInfo();

    this.info.desktop = GLib.getenv('XDG_CURRENT_DESKTOP');
    this.info.host = GLib.get_host_name();
    this.info.user = GLib.get_user_name();
    this.info.lang = GLib.getenv('LANG');
    this.info.home = GLib.get_home_dir();
    this.info.installed = file[1].indexOf('./local/share/applications') !== -1;
    this.info.program = GLib.get_prgname();
    this.info.script = file[2];
    this.info.folder = file[1];
    this.info.current = GLib.get_current_dir();
    this.setLabel();

    reader1 = new Spawn.SpawnReader();
    reader1.spawn('./', ['lsb_release', '-d'], line => {
      this.info.dstr = line
        .toString()
        .split('\n')[0]
        .split(':\t')[1];
      this.setLabel();
    });

    reader2 = new Spawn.SpawnReader();
    reader2.spawn('./', ['uname', '-r'], line => {
      this.info.kernel = line.toString();
      this.setLabel();
    });
  }

  setLabel() {
    let text;

    text = '';
    if (this.info.desktop !== '')
      text = `${text}\nDesktop: ${this.info.desktop}`;
    if (this.info.host !== '') text = `${text}\nHost: ${this.info.host}`;
    if (this.info.user !== '') text = `${text}\nUser: ${this.info.user}`;
    if (this.info.lang !== '') text = `${text}\nLanguage: ${this.info.lang}`;
    if (this.info.home !== '') text = `${text}\nHome: ${this.info.home}`;
    text = `${text}\n`;
    if (this.info.installed !== '')
      text = `${text}\nInstalled: ${this.info.installed}`;
    if (this.info.program !== '')
      text = `${text}\nProgram: ${this.info.program}`;
    if (this.info.script !== '') text = `${text}\nScript: ${this.info.script}`;
    if (this.info.folder !== '') text = `${text}\nFolder: ${this.info.folder}`;
    if (this.info.current !== '')
      text = `${text}\nCurrent: ${this.info.current}`;
    if (this.info.icon !== '') text = `${text}\nIcon: ${this.info.icon}`;
    text = `${text}\n`;
    if (this.info.dstr !== '') text = `${text}\nDistro: ${this.info.dstr}`;
    if (this.info.kernel !== '') text = `${text}\nKernel: ${this.info.kernel}`;

    this.label.set_text(text);
  }
}

//Run the application
let app = new App();
app.run(ARGV);
