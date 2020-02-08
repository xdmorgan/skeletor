#!/usr/bin/env node
"use strict";
const meow = require("meow");
const run = require("./run");

const cli = meow(
  `
    Usage
      $ skeletor
 
    Options
      --config, -C     Specify config file/path
      --output, -O     Specify output folder/path 
      --gzip           Produce gzipped outputs (system command)
      --no-sass        Disable production of Sass core
      --no-minify      Disable production of minified outputs
      --no-sourcemap   Disable production of sourcemaps
 
    Examples
      $ skeletor --config config.yml --output dist
      Specify an alternate path to config file (default: ./skeletor.yml)
`,
  {
    flags: {
      config: {
        type: "string",
        alias: "C",
        default: "skeletor.yml"
      },
      output: {
        type: "string",
        alias: "O",
        default: "skeletor"
      },
      gzip: {
        type: "boolean",
        default: false
      },
      minify: {
        type: "boolean",
        default: true
      },
      sourcemap: {
        type: "boolean",
        default: true
      },
      sass: {
        type: "boolean",
        default: true
      }
    }
  }
);

run(cli.flags);
