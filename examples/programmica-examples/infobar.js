'use strict'

// transformed from /vendor/programmica-examples/infobar.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

function on_info_bar_changed(button) {
  infobar.show();
  infobar.set_message_type(button.message_type);
}

function on_info_bar_close() {
  infobar.hide();
}

const window = new Gtk.Window();
window.set_title('InfoBar');
window.connect('destroy', Gtk.main_quit);

const grid = new Gtk.Grid();
grid.set_row_spacing(5);
window.add(grid);

var infobar = new Gtk.InfoBar();
infobar.set_show_close_button(true);
infobar.connect('response', function() {
  on_info_bar_close(infobar);
});
grid.attach(infobar, 0, 0, 1, 1);

const content = infobar.get_content_area();
const label = new Gtk.Label({ label: 'An InfoBar used to display messages.' });
content.add(label);

const buttonbox = new Gtk.ButtonBox({
  orientation: Gtk.Orientation.HORIZONTAL
});
buttonbox.set_spacing(5);
grid.attach(buttonbox, 0, 1, 1, 1);

const buttonInformation = new Gtk.Button({ label: 'Information' });
buttonInformation.message_type = Gtk.MessageType.INFO;
buttonInformation.connect('clicked', function() {
  on_info_bar_changed(buttonInformation);
});
buttonbox.add(buttonInformation);
const buttonWarning = new Gtk.Button({ label: 'Warning' });
buttonWarning.message_type = Gtk.MessageType.WARNING;
buttonWarning.connect('clicked', function() {
  on_info_bar_changed(buttonWarning);
});
buttonbox.add(buttonWarning);
const buttonQuestion = new Gtk.Button({ label: 'Question' });
buttonQuestion.message_type = Gtk.MessageType.QUESTION;
buttonQuestion.connect('clicked', function() {
  on_info_bar_changed(buttonQuestion);
});
buttonbox.add(buttonQuestion);
const buttonError = new Gtk.Button({ label: 'Error' });
buttonError.message_type = Gtk.MessageType.ERROR;
buttonError.connect('clicked', function() {
  on_info_bar_changed(buttonError);
});
buttonbox.add(buttonError);
const buttonOther = new Gtk.Button({ label: 'Other' });
buttonOther.message_type = Gtk.MessageType.OTHER;
buttonOther.connect('clicked', function() {
  on_info_bar_changed(buttonOther);
});
buttonbox.add(buttonOther);

window.show_all();

Gtk.main();
