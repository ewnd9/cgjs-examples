'use strict'

// transformed from /vendor/programmica-examples/textview.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');
const Pango = require('Pango');

Gtk.init(null);

function on_wrap_mode_changed(radiobutton) {
  textview.set_wrap_mode(radiobutton.wrap_mode);
}

function on_style_changed() {
  const [success, start, end] = textbuffer.get_selection_bounds();

  if (success) {
    if (checkbuttonBold.get_active())
      textbuffer.apply_tag(texttagBold, start, end);
    else textbuffer.remove_tag(texttagBold, start, end);

    if (checkbuttonItalic.get_active())
      textbuffer.apply_tag(texttagItalic, start, end);
    else textbuffer.remove_tag(texttagItalic, start, end);

    if (checkbuttonUnderline.get_active())
      textbuffer.apply_tag(texttagUnderline, start, end);
    else textbuffer.remove_tag(texttagUnderline, start, end);
  }
}

const window = new Gtk.Window();
window.set_title('TextView');
window.set_default_size(200, 250);
window.connect('destroy', Gtk.main_quit);

const grid = new Gtk.Grid();
window.add(grid);

const scrolledwindow = new Gtk.ScrolledWindow();
scrolledwindow.set_policy(Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
grid.attach(scrolledwindow, 0, 0, 2, 1);

var textview = new Gtk.TextView();
textview.set_vexpand(true);
textview.set_hexpand(true);
scrolledwindow.add(textview);

var textbuffer = textview.get_buffer();
textbuffer.set_text(
  'GTK+, or the GIMP Toolkit, is a multi-platform toolkit for creating graphical user interfaces. Offering a complete set of widgets, GTK+ is suitable for projects ranging from small one-off tools to full application suites.',
  -1
);

const texttagtable = textbuffer.get_tag_table();

var texttagBold = new Gtk.TextTag({ weight: Pango.Weight.BOLD });
texttagtable.add(texttagBold);
var texttagItalic = new Gtk.TextTag({ style: Pango.Style.ITALIC });
texttagtable.add(texttagItalic);
var texttagUnderline = new Gtk.TextTag({ underline: Pango.Underline.SINGLE });
texttagtable.add(texttagUnderline);

var buttonbox = new Gtk.ButtonBox();
buttonbox.set_orientation(Gtk.Orientation.VERTICAL);
grid.attach(buttonbox, 0, 1, 1, 1);

const radiobuttonWrapNone = new Gtk.RadioButton({ label: 'None' });
radiobuttonWrapNone.wrap_mode = Gtk.WrapMode.NONE;
radiobuttonWrapNone.connect('toggled', function() {
  on_wrap_mode_changed(radiobuttonWrapNone);
});
buttonbox.add(radiobuttonWrapNone);

const radiobuttonWrapChar = new Gtk.RadioButton({
  label: 'Character',
  group: radiobuttonWrapNone
});
radiobuttonWrapChar.wrap_mode = Gtk.WrapMode.CHAR;
radiobuttonWrapChar.connect('toggled', function() {
  on_wrap_mode_changed(radiobuttonWrapChar);
});
buttonbox.add(radiobuttonWrapChar);

const radiobuttonWrapWord = new Gtk.RadioButton({
  label: 'Word',
  group: radiobuttonWrapNone
});
radiobuttonWrapWord.wrap_mode = Gtk.WrapMode.WORD;
radiobuttonWrapWord.connect('toggled', function() {
  on_wrap_mode_changed(radiobuttonWrapWord);
});
buttonbox.add(radiobuttonWrapWord);

const radiobuttonWrapWordChar = new Gtk.RadioButton({
  label: 'Word & Character',
  group: radiobuttonWrapNone
});
radiobuttonWrapWordChar.wrap_mode = Gtk.WrapMode.WORD_CHAR;
radiobuttonWrapWordChar.connect('toggled', function() {
  on_wrap_mode_changed(radiobuttonWrapWordChar);
});
buttonbox.add(radiobuttonWrapWordChar);

var buttonbox = new Gtk.ButtonBox();
buttonbox.set_orientation(Gtk.Orientation.VERTICAL);
grid.attach(buttonbox, 1, 1, 1, 1);

var checkbuttonBold = new Gtk.CheckButton({ label: 'Bold' });
checkbuttonBold.connect('toggled', on_style_changed);
buttonbox.add(checkbuttonBold);

var checkbuttonItalic = new Gtk.CheckButton({ label: 'Italic' });
checkbuttonItalic.connect('toggled', on_style_changed);
buttonbox.add(checkbuttonItalic);

var checkbuttonUnderline = new Gtk.CheckButton({ label: 'Underline' });
checkbuttonUnderline.connect('toggled', on_style_changed);
buttonbox.add(checkbuttonUnderline);

window.show_all();

Gtk.main();
