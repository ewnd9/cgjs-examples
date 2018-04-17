'use strict'

// transformed from /vendor/programmica-examples/recentfilter.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

const recentchooserdialog = new Gtk.RecentChooserDialog();
recentchooserdialog.set_title('RecentFilter');
recentchooserdialog.add_button('_Cancel', Gtk.ResponseType.CANCEL);
recentchooserdialog.add_button('_Select', Gtk.ResponseType.OK);

var recentfilter = new Gtk.RecentFilter();
recentfilter.set_name('All Files');
recentfilter.add_pattern('*');
recentchooserdialog.add_filter(recentfilter);

var recentfilter = new Gtk.RecentFilter();
recentfilter.set_name('Music Files');
recentfilter.add_pattern('*.mp3');
recentfilter.add_mime_type('audio/ogg');
recentchooserdialog.add_filter(recentfilter);

recentchooserdialog.run();
recentchooserdialog.destroy();
