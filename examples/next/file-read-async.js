const { GLib, Gio } = imports.gi;

// inspired by https://github.com/foreachsam/book-lang-javascript-gjs/blob/3f83c147cb58b48115fe16d4b04eded68a6d4648/book/example/gio/file-read-line-async/main.js

// File http://devdocs.baznga.org/gio20~2.50p/gio.file
// File.read http://devdocs.baznga.org/gio20~2.50p/gio.file#method-read
// File.read returns Gio.FileInputStream http://devdocs.baznga.org/gio20~2.50p/gio.fileinputstream
// Gio.DataInputStream http://devdocs.baznga.org/gio20~2.50p/gio.datainputstream

const mainLoop = GLib.MainLoop.new(null, null);
const rootPath = GLib.get_current_dir();

function readLine(stream, result) {
  const [line] = stream.read_line_finish(result);

  if (line === null) {
    mainLoop.quit();
    return;
  }

  print(line);
  stream.read_line_async(GLib.PRIORITY_DEFAULT, null, readLine);
}

function main() {
  const file = Gio.File.new_for_path(`${rootPath}/README.md`);
  const stream = new Gio.DataInputStream({ base_stream: file.read(null) });

  stream.read_line_async(GLib.PRIORITY_DEFAULT, null, readLine);
}

main();
mainLoop.run();
