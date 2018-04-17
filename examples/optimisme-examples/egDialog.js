'use strict'

// transformed from /vendor/optimisme-examples/egDialog.js by /scripts/transform.js
// (license unspecified)

const Gio = require('Gio');
const GLib = require('GLib');
const Gtk = require('Gtk');

class App {
  constructor() {
    this.title = 'Example Dialog';
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
    this.initMenu();
    this.buildUI();
  }

  initMenu() {
    let menu, section, dialogAction, modalAction, quitAction;

    menu = new Gio.Menu();

    section = new Gio.Menu();
    section.append('Dialog', 'app.dialog');
    menu.append_section(null, section);

    section = new Gio.Menu();
    section.append('Modal', 'app.modal');
    menu.append_section(null, section);

    section = new Gio.Menu();
    section.append('Quit', 'app.quit');
    menu.append_section(null, section);

    dialogAction = new Gio.SimpleAction({ name: 'dialog' });
    dialogAction.connect('activate', () => {
      this.showDialog();
    });
    this.application.add_action(dialogAction);

    modalAction = new Gio.SimpleAction({ name: 'modal' });
    modalAction.connect('activate', () => {
      this.showModal();
    });
    this.application.add_action(modalAction);

    quitAction = new Gio.SimpleAction({ name: 'quit' });
    quitAction.connect('activate', () => {
      this.window.destroy();
    });
    this.application.add_action(quitAction);

    this.application.set_app_menu(menu);
  }

  buildUI() {
    let result = false;

    this.window = new Gtk.ApplicationWindow({
      application: this.application,
      title: this.title,
      default_height: 300,
      default_width: 500,
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
    let label;

    label = new Gtk.Label({
      label: `Open the '${
        this.title
      }' application menu and click on 'Dialog' or 'Modal'`
    });
    label.set_line_wrap(true);
    label.set_lines(5);

    return label;
  }

  showDialog() {
    let label, dialog, contentArea;

    label = new Gtk.Label({
      label: "Hello 'Dialog'!",
      vexpand: true
    });

    dialog = new Gtk.Dialog({
      default_height: 200,
      default_width: 200,
      modal: false,
      transient_for: this.window,
      title: 'Dialog',
      use_header_bar: true
    });

    dialog.connect('response', function() {
      dialog.destroy();
    });

    contentArea = dialog.get_content_area();
    contentArea.add(label);

    dialog.show_all();
  }

  showModal() {
    let label, modal, contentArea, button, actionArea;

    label = new Gtk.Label({
      label: "Hello 'Modal'!",
      vexpand: true
    });

    modal = new Gtk.Dialog({
      default_height: 200,
      default_width: 200,
      modal: true,
      transient_for: this.window,
      title: 'Modal',
      use_header_bar: false
    });

    modal.connect('response', function() {
      modal.destroy();
    });

    contentArea = modal.get_content_area();
    contentArea.add(label);

    button = Gtk.Button.new_with_label('OK');
    button.connect('clicked', () => {
      print('OK pressed');
      modal.destroy();
    });

    actionArea = modal.get_action_area();
    actionArea.add(button);

    modal.show_all();
  }
}

//Run the application
let app = new App();
app.run(ARGV);
