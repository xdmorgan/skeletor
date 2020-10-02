#!/usr/bin/env node
'use strict'
const meow = require('meow')
const app = require('../src')

const cli = meow(
  `
    Usage
      $ skeletor
 
    Options
      --config, -C     Specify config file/path
      --output, -O     Specify output folder/path 
      --gzip           Produce gzipped outputs
      --no-json        Disable output of JSON object
      --no-sass        Disable output of Sass core
      --no-minify      Prefer compact to default compressed Sass outputStyle
      --no-sourcemap   Disable output of sourcemaps
 
    Examples
      $ skeletor --config config.yml --output dist
      Specify an alternate path to config file (default: ./skeletor.yml)
`,
  {
    flags: {
      config: {
        type: 'string',
        alias: 'C',
        default: 'skeletor.yml',
      },
      output: {
        type: 'string',
        alias: 'O',
        default: 'skeletor',
      },
      gzip: {
        type: 'boolean',
        default: false,
      },
      minify: {
        type: 'boolean',
        default: true,
      },
      sourcemap: {
        type: 'boolean',
        default: true,
      },
      json: {
        type: 'boolean',
        default: true,
      },
      sass: {
        type: 'boolean',
        default: true,
      },
    },
  }
)

app(cli.flags)
