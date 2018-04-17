'use strict'

// transformed from /vendor/optimisme-examples/egOpen.js by /scripts/transform.js
// (license unspecified)

const Gio = require('Gio');
const GLib = require('GLib');
const GObj = imports.gi.GObject;
const Gtk = require('Gtk');

class App {
  constructor() {
    this.title = 'Example Open';
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
      default_height: 400,
      default_width: 500,
      window_position: Gtk.WindowPosition.CENTER
    });
    try {
      this.window.set_icon_from_file(`${__dirname}/assets/appIcon.png`);
    } catch (err) {
      this.window.set_icon_name('application-x-executable');
    }

    this.window.set_titlebar(this.getHeader());
    this.window.add(this.getBody());
  }

  getHeader() {
    let headerBar, button;

    headerBar = new Gtk.HeaderBar();
    headerBar.set_show_close_button(true);

    button = new Gtk.Button({ label: 'Open' });
    button.connect('clicked', () => {
      this.openDialog();
    });

    headerBar.pack_start(button);
    return headerBar;
  }

  getBody() {
    let content, scroll, view, label;

    content = new Gtk.Grid();
    scroll = new Gtk.ScrolledWindow({ hexpand: true, vexpand: true });
    this.buffer = new Gtk.TextBuffer();
    view = new Gtk.TextView();
    view.set_buffer(this.buffer);

    scroll.add(view);

    this.label = new Gtk.Label({
      halign: Gtk.Align.START,
      label: 'Open a file...'
    });

    content.attach(scroll, 0, 0, 1, 1);
    content.attach(this.label, 0, 1, 1, 1);

    return content;
  }

  openDialog() {
    let filter,
      chooser,
      store,
      combo,
      renderer,
      result,
      name,
      file,
      exit = false;

    filter = new Gtk.FileFilter();
    filter.add_mime_type('text/plain');

    chooser = new Gtk.FileChooserDialog({
      action: Gtk.FileChooserAction.OPEN,
      filter: filter,
      select_multiple: false,
      transient_for: this.window,
      title: 'Open'
    });

    // Without setting a current folder, folders won't show its contents
    //
    // Example set home folder by default:
    // chooser.set_current_folder(GLib.get_home_dir());
    chooser.set_current_folder(__dirname);

    // Add the buttons and its return values
    chooser.add_button('Cancel', Gtk.ResponseType.CANCEL);
    chooser.add_button('OK', Gtk.ResponseType.OK);

    // This is to add the 'combo' filtering options
    store = new Gtk.ListStore();
    store.set_column_types([GObj.TYPE_STRING, GObj.TYPE_STRING]);
    store.set(store.append(), [0, 1], ['text', 'text/plain']);
    store.set(store.append(), [0, 1], ['js', '*.js']);
    store.set(store.append(), [0, 1], ['md', '*.md']);

    combo = new Gtk.ComboBox({ model: store });
    renderer = new Gtk.CellRendererText();
    combo.pack_start(renderer, false);
    combo.add_attribute(renderer, 'text', 1);
    combo.set_active(0);
    combo.connect('changed', widget => {
      let model, active, type, text, filter;

      model = widget.get_model();
      active = widget.get_active_iter()[1];

      type = model.get_value(active, 0);
      text = model.get_value(active, 1);

      if (type === 'text') {
        filter = new Gtk.FileFilter();
        filter.add_mime_type(text);
      } else {
        filter = new Gtk.FileFilter();
        filter.add_pattern(text);
      }

      chooser.set_filter(filter);
    });
    chooser.set_extra_widget(combo);

    // Run the dialog
    result = chooser.run();
    name = chooser.get_filename();

    if (result === Gtk.ResponseType.OK) {
      this.openFile(name);
    }
    chooser.destroy();
  }

  openFile(name) {
    let file;

    file = Gio.File.new_for_path(name);

    file.load_contents_async(null, (file, res) => {
      let contents;
      try {
        contents = file.load_contents_finish(res)[1];
        this.buffer.delete(
          this.buffer.get_iter_at_offset(0),
          this.buffer.get_iter_at_offset(this.buffer.get_char_count())
        );
        this.buffer.insert_at_cursor(`${contents.toString()}\n`, -1);
      } catch (e) {
        return;
      }
    });

    file.query_info_async(
      'standard::type,standard::size',
      Gio.FileQueryInfoFlags.NONE,
      GLib.PRIORITY_LOW,
      null,
      (source, async) => {
        let info, type, size, text;

        info = source.query_info_finish(async);
        type = info.get_file_type();
        size = info.get_size();

        text = `File info type: ${type}, size: ${size}`;
        this.label.set_text(text);
      }
    );
  }
}

//Run the application
let app = new App();
app.run(ARGV);

// Help: https://people.gnome.org/~gcampagna/docs/Gio-2.0/Gio.File.html
