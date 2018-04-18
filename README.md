# cgjs-examples

[![Build Status](https://travis-ci.org/ewnd9/cgjs-examples.svg?branch=master)](https://travis-ci.org/ewnd9/cgjs-examples)

## Install

```sh
$ yarn install
```

## Usage

```sh
$ node_modules/.bin/cgjs examples/optimisme-examples/egAsset.js
```

## Regenerate

```sh
$ yarn generate
```

## Tests

```sh
$ yarn test
```

### Docker testing

```sh
$ docker build -t cgjs-examples .
$ docker run -it --rm -v $PWD:/app cgjs-examples /bin/bash
```

## License

CC0.
