'use strict'

// transformed from /vendor/programmica-examples/messagedialog.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

function on_button_clicked(button) {
  messagedialog.message_type = button.type;
  messagedialog.run();
  messagedialog.hide();
}

const window = new Gtk.Window();
window.set_title('MessageDialog');
window.connect('destroy', Gtk.main_quit);

const buttonbox = new Gtk.ButtonBox({
  orientation: Gtk.Orientation.HORIZONTAL
});
window.add(buttonbox);

const buttonInformation = new Gtk.Button({ label: 'Information' });
buttonInformation.type = Gtk.MessageType.INFO;
buttonInformation.connect('clicked', function() {
  on_button_clicked(buttonInformation);
});
buttonbox.add(buttonInformation);
const buttonQuestion = new Gtk.Button({ label: 'Question' });
buttonQuestion.type = Gtk.MessageType.QUESTION;
buttonQuestion.connect('clicked', function() {
  on_button_clicked(buttonQuestion);
});
buttonbox.add(buttonQuestion);
const buttonWarning = new Gtk.Button({ label: 'Warning' });
buttonWarning.type = Gtk.MessageType.WARNING;
buttonWarning.connect('clicked', function() {
  on_button_clicked(buttonWarning);
});
buttonbox.add(buttonWarning);
const buttonError = new Gtk.Button({ label: 'Error' });
buttonError.type = Gtk.MessageType.ERROR;
buttonError.connect('clicked', function() {
  on_button_clicked(buttonError);
});
buttonbox.add(buttonError);
const buttonOther = new Gtk.Button({ label: 'Other' });
buttonOther.type = Gtk.MessageType.OTHER;
buttonOther.connect('clicked', function() {
  on_button_clicked(buttonOther);
});
buttonbox.add(buttonOther);

var messagedialog = new Gtk.MessageDialog();
messagedialog.set_transient_for(window);
messagedialog.set_markup(
  "<span size='12000'><b>The MessageDialog is used to display messages to the user.</b></span>"
);
messagedialog.secondary_text =
  'It can be used for informational, warning or error messages, or simply for asking questions.';
messagedialog.add_button('Close', Gtk.ResponseType.CLOSE);

window.show_all();

Gtk.main();
