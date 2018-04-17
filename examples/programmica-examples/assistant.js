'use strict'

// transformed from /vendor/programmica-examples/assistant.js by /scripts/transform.js
// (license CC0-1.0)

const Gtk = require('Gtk');

Gtk.init(null);

function on_apply_clicked() {
  print('The Apply button has been clicked.');
}

function on_close_clicked() {
  print('The Close button has been clicked.');
  Gtk.main_quit();
}

function on_cancel_clicked() {
  print('The Assistant has been cancelled.');
  Gtk.main_quit();
}

function on_complete_toggled(checkbutton) {
  assistant.set_page_complete(complete, checkbutton.get_active());
}

var assistant = new Gtk.Assistant();
assistant.set_title('Assistant');
assistant.set_default_size(400, -1);
assistant.connect('cancel', on_cancel_clicked);
assistant.connect('close', on_close_clicked);
assistant.connect('apply', on_apply_clicked);

var box = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL });
assistant.append_page(box);
assistant.set_page_type(box, Gtk.AssistantPageType.INTRO);
assistant.set_page_title(box, 'Page 1: Introduction');
var label = new Gtk.Label({
  label:
    "An 'Intro' page is the first page of an Assistant. It is used to provide information about what configuration settings need to be configured. The introduction page only has a 'Continue' button."
});
label.set_line_wrap(true);
box.pack_start(label, true, true, 0);
assistant.set_page_complete(box, true);

var box = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL });
assistant.append_page(box);
assistant.set_page_type(box, Gtk.AssistantPageType.CONTENT);
assistant.set_page_title(box, 'Page 2: Content');
var label = new Gtk.Label({
  label:
    "The 'Content' page provides a place where widgets can be positioned. This allows the user to configure a variety of options as needed. The page contains a 'Continue' button to move onto other pages, and a 'Go Back' button to return to the previous page if necessary."
});
label.set_line_wrap(true);
box.pack_start(label, true, true, 0);
assistant.set_page_complete(box, true);

var complete = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL });
const age = assistant.append_page(complete);
assistant.set_page_type(complete, Gtk.AssistantPageType.PROGRESS);
assistant.set_page_title(complete, 'Page 3: Progress');
var label = new Gtk.Label({
  label:
    "A 'Progress' page is used to prevent changing pages within the Assistant before a long-running process has completed. The 'Continue' button will be marked as insensitive until the process has finished. Once finished, the button will become sensitive."
});
label.set_line_wrap(true);
complete.pack_start(label, true, true, 0);
const checkbutton = new Gtk.CheckButton({ label: 'Mark page as complete' });
checkbutton.connect('toggled', on_complete_toggled);
complete.pack_start(checkbutton, false, false, 0);

var box = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL });
assistant.append_page(box);
assistant.set_page_type(box, Gtk.AssistantPageType.CONFIRM);
assistant.set_page_title(box, 'Page 4: Confirm');
var label = new Gtk.Label({
  label:
    "The 'Confirm' page may be set as the final page in the Assistant, however this depends on what the Assistant does. This page provides an 'Apply' button to explicitly set the changes, or a 'Go Back' button to correct any mistakes."
});
label.set_line_wrap(true);
box.pack_start(label, true, true, 0);
assistant.set_page_complete(box, true);

var box = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL });
assistant.append_page(box);
assistant.set_page_type(box, Gtk.AssistantPageType.SUMMARY);
assistant.set_page_title(box, 'Page 5: Summary');
var label = new Gtk.Label({
  label:
    "A 'Summary' should be set as the final page of the Assistant if used however this depends on the purpose of your Assistant. It provides information on the changes that have been made during the configuration or details of what the user should do next. On this page only a Close button is displayed. Once at the Summary page, the user cannot return to any other page."
});
label.set_line_wrap(true);
box.pack_start(label, true, true, 0);
assistant.set_page_complete(box, true);

assistant.show_all();

Gtk.main();
