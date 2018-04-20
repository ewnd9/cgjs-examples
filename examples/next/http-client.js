// inspired by https://github.com/selaux/gnome-shell-extension-github-integration/blob/56d540ebf0e2a9284c4363b75266414deacce6d5/src/lib/getHttpSession.js

const { Gtk, Soup } = imports.gi;

const request = {
  get(url, { headers = {} } = {}) {
    const httpSession = new Soup.SessionAsync();
    const request = Soup.Message.new('GET', url);

    Object.entries(headers).forEach(([k, v]) => {
      request.request_headers.append(k, v);
    });

    return new Promise((resolve, reject) => {
      httpSession.queue_message(request, (session, response) => {
        if (response.status_code !== 200) {
          const err = new Error(`Failed with status code: ${response.status_code}`);
          reject(err);
        } else {
          const body = JSON.parse(response.response_body.data);

          resolve({
            status: response.status_code,
            body
          });
        }
      });
    });
  }
};

main()
  .then(() => {
    Gtk.main_quit();
    imports.system.exit(0);
  })
  .catch(err => {
    print(err);

    Gtk.main_quit();
    imports.system.exit(1); // $? still shows 0
  });

async function main() {
  const { body: repos } = await request.get('https://api.github.com/users/ewnd9/repos', {
    headers: {
      'User-Agent': 'ewnd9/cgjs-examples'
    }
  });

  print(`${repos.length} repos`);
}

Gtk.main();
