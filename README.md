# pipage-multiwrite
[![npm](https://img.shields.io/npm/v/pipage-multiwrite.svg?style=flat-square)](https://npmjs.com/package/pipage-multiwrite)
[![npm license](https://img.shields.io/npm/l/pipage-multiwrite.svg?style=flat-square)](https://npmjs.com/package/pipage-multiwrite)
[![npm downloads](https://img.shields.io/npm/dm/pipage-multiwrite.svg?style=flat-square)](https://npmjs.com/package/pipage-multiwrite)
[![build status](https://img.shields.io/travis/resin-io-playground/pipage-multiwrite/master.svg?style=flat-square)](https://travis-ci.org/resin-io-playground/pipage-multiwrite)

## Install via [npm](https://npmjs.com)

```sh
npm install --global resin-io-playground/pipage-multiwrite
```

## Install via git

```sh
git clone https://github.com/resin-io-playground/pipage-multiwrite.git
cd pipage-multiwrite
npm install
```

## Usage

```
Usage: multipipage [options] [devices]

Options:

  --image <file>

    The image file to flash

  --verify

    Whether or not to verify the image after writing

  --mode <single|child>

    Which mode to use; defaults to "single"
      - "single" runs everything on the main process
      - "child" runs each device write in its own child process

  --threadpool-size <size>

    Set the UV_THREADPOOL_SIZE

Examples:

  Run on a single thread:
    $ bin/multipipage --image some.img --mode single /dev/rdisk2 /dev/rdisk3

  Run with child processes:
    $ bin/multipipage --image some.img --mode child --threadpool-size 6 /dev/rdisk2 /dev/rdisk3
```
