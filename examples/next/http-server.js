// inspired by https://github.com/denyadzi/gnome-gjs-samples/blob/master/soup/static_server/main.js

const { Soup } = imports.gi;
const Mainloop = imports.mainloop;

const server = new Soup.Server();

// server.add_handler http://devdocs.baznga.org/soup24~2.56.0/soup.server#method-add_handler
// server.add_handler callback http://devdocs.baznga.org/soup24~2.56.0/soup.servercallback
// server.add_handler callback msg http://devdocs.baznga.org/soup24~2.56.0/soup.message

server.add_handler('/', (server, msg/*, path, query, client*/) => {
  msg.connect('finished', (/*msg*/) => {
    log('Finish');
  });

  msg.response_headers.set_content_type('application/json', null);
  msg.response_body.append(JSON.stringify({ test: 1 }));
  msg.response_body.complete();
  msg.set_status(200);
});

const port = 8000;

server.listen_local(port, Soup.ServerListenOptions.IPV4_ONLY);
print(`listening localhost:${port}`);

Mainloop.run('server');
