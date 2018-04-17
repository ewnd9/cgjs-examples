'use strict'

// transformed from /vendor/programmica-examples/label.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

const window = new Gtk.Window();
window.set_title('Label');
window.set_default_size(600, -1);
window.connect('destroy', Gtk.main_quit);

const grid = new Gtk.Grid();
grid.set_border_width(5);
grid.set_row_spacing(5);
grid.set_column_spacing(5);
window.add(grid);

var label = new Gtk.Label({ label: 'An example of a Label widget.' });
label.set_selectable(true);
grid.attach(label, 0, 0, 1, 1);
var label = new Gtk.Label({
  label:
    'This is a label spread across multiple\nlines using the newspace character\nto indicate the line break.'
});
grid.attach(label, 0, 1, 1, 1);
var label = new Gtk.Label({
  label: 'Tab spaces\tcan also be\tdefined if required.'
});
grid.attach(label, 0, 2, 1, 1);
var label = new Gtk.Label({
  label: 'Label widgets can also accept underline patterns.'
});
label.set_pattern('_____                         _________');
label.set_line_wrap(true);
grid.attach(label, 0, 3, 1, 1);

var label = new Gtk.Label({
  label:
    'Justification options are\nable to align text in the label,\n such as to the left.'
});
label.set_justify(Gtk.Justification.LEFT);
grid.attach(label, 1, 0, 1, 1);
var label = new Gtk.Label({
  label:
    'Centering of text is possible\nto ensure that the margin\nof each sentence is even.'
});
label.set_justify(Gtk.Justification.CENTER);
grid.attach(label, 1, 1, 1, 1);
var label = new Gtk.Label({
  label:
    'Text can also be right-justified\n to align to the right hand\nmargin of the label.'
});
label.set_justify(Gtk.Justification.RIGHT);
grid.attach(label, 1, 2, 1, 1);
var label = new Gtk.Label({
  label:
    'Content is also justifiable to ensure that the sentences are evenly distributed. This ensures that the endings of each lines match. It does however require line wrapping to be enabled, and there are no manual breaks.'
});
label.set_line_wrap(true);
label.set_justify(Gtk.Justification.FILL);
grid.attach(label, 1, 3, 1, 1);

var label = new Gtk.Label({
  label: 'An angle can also be specified\nto orient the text.'
});
label.set_angle(90);
grid.attach(label, 2, 0, 1, 3);
var label = new Gtk.Label({
  label: "<a href='http://programmica.com/'>A website link</a>"
});
label.set_use_markup(true);
grid.attach(label, 2, 3, 1, 1);

window.show_all();

Gtk.main();
