const { GLib, Gio } = imports.gi;

// File http://devdocs.baznga.org/gio20~2.50p/gio.file
// File.read http://devdocs.baznga.org/gio20~2.50p/gio.file#method-read
// File.read returns Gio.FileInputStream http://devdocs.baznga.org/gio20~2.50p/gio.fileinputstream
// Gio.DataInputStream http://devdocs.baznga.org/gio20~2.50p/gio.datainputstream

const rootPath = GLib.get_current_dir();
const file = Gio.File.new_for_path(`${rootPath}/README.md`);
const stream = new Gio.DataInputStream({ base_stream: file.read(null) });

let line;

while (([line] = stream.read_line(null))) {
  if (line === null) {
    break;
  }

  print(line);
}

