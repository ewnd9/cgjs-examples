const { GLib } = imports.gi;

// inspired by https://github.com/foreachsam/book-lang-javascript-gjs/blob/3f83c147cb58b48115fe16d4b04eded68a6d4648/book/example/file/file-get-contents/main.js
// GLib.file_get_contents http://devdocs.baznga.org/glib20~2.50.0/glib.file_get_contents

const rootPath = GLib.get_current_dir();
const [ok, content] = GLib.file_get_contents(`${rootPath}/README.md`);
print(ok, content);
