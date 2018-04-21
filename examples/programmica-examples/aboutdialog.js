'use strict'

// transformed from /vendor/programmica-examples/aboutdialog.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');
const GdkPixbuf = require('GdkPixbuf');

Gtk.init(null);

const logo = GdkPixbuf.Pixbuf.new_from_file_at_size(
  `${__dirname}/_resources/gtk.png`,
  64,
  64
);

const aboutdialog = new Gtk.AboutDialog();
aboutdialog.set_title('Dialog');
aboutdialog.set_program_name('Programmica');
aboutdialog.set_version('1.0');
aboutdialog.set_comments(
  'Programming, system and network administration resources'
);
aboutdialog.set_website('https://programmica.com/');
aboutdialog.set_website_label('Programmica Website');
aboutdialog.set_authors(['Andrew Steele']);
aboutdialog.set_logo(logo);

aboutdialog.run();
aboutdialog.destroy();
