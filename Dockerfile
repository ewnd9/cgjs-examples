FROM ubuntu:17.10

RUN apt-get update && apt-get install -y curl
RUN curl --silent --location https://deb.nodesource.com/setup_8.x | bash -

RUN apt-get install -y \
    nodejs \
    build-essential \
    xvfb \
    gjs

RUN npm install -g yarn

WORKDIR /app
CMD /bin/bash
