FROM ubuntu:17.10

RUN apt-get update && apt-get install -y curl
RUN curl --silent --location https://deb.nodesource.com/setup_8.x | bash -

RUN apt-get install -y \
    libgtop2-dev gir1.2-soup-2.4 libkeybinder-3.0-0 gir1.2-keybinder gir1.2-webkit-3.0 gir1.2-webkit2-4.0 \
    gir1.2-clutter-1.0 gir1.2-gtkclutter-1.0 \
    nodejs \
    build-essential \
    xvfb \
    gjs

RUN npm install -g yarn

WORKDIR /app
CMD /bin/bash
