#!/usr/bin/env node
// deps
const fs = require('fs-extra')
const path = require('path')
const spawn = require('cross-spawn')
const { gzip } = require('node-gzip')
// internal deps
const { parse } = require('./parse-config')
const { getFilePaths } = require('./get-file-paths')
const { render, pathsByEntryPointName } = require('./render-sass')

// shorthand for repeated multi-step rendering of sass entry points
async function renderAndWriteByIndexName(name, dir, opts = {}) {
  const paths = pathsByEntryPointName(name, dir)
  const rendered = await render({ src: paths.src, dest: paths.dest, ...opts })
  await fs.writeFile(paths.dest, rendered.styles)
  opts.sourceMap && (await fs.writeFile(paths.map, rendered.sourceMap))
  if (opts.gzipOutput) {
    const gzipped = await gzip(rendered.styles)
    await fs.writeFile(paths.gzip, gzipped)
  }
}

// TODO: rename config (file) and output (dir) to in-file and out-dir
async function main({ config, output, gzip, minify, sourcemap, sass } = {}) {
  // get all the paths we need
  const paths = getFilePaths({
    localDir: path.join(__dirname, '..'),
    remoteDir: process.cwd(),
    inFile: config,
    outDir: output,
  })
  // parse config file
  const parsed = await parse(paths.config)
  // clean any existing temp dir
  await fs.remove(paths.temp.dir)
  // copy the source sass directory to temp location for mutation
  await fs.copy(paths.src.sass, paths.temp.sass.dir)
  // write the parsed config as json in the temp dir for use in js
  await fs.writeFile(paths.temp.json, JSON.stringify(parsed, undefined, 2))
  // convert the json config to a sass map named `$skeletor`
  spawn.sync('./node_modules/.bin/json-to-scss', [
    paths.temp.json,
    paths.temp.sass.config,
    '--p="$skeletor: "',
  ])
  // node-sass render options
  const settings = {
    outputStyle: minify ? 'compressed' : 'compact',
    sourceMap: !!sourcemap,
    gzipOutput: !!gzip,
  }
  // with the settings above, render sass as css then write to to temp
  // dir for the skeletor.scss and skeletor.vars.scss entry points
  await renderAndWriteByIndexName('skeletor', paths.temp.dir, settings)
  await renderAndWriteByIndexName('skeletor.vars', paths.temp.dir, settings)
  // now that the css files are rendered and written, begin clean up
  if (sass) {
    // if we're copying the Sass directory to cwd, we need to clean
    // up the non-core stuff which would produce duplicated rules
    await fs.remove(path.join(paths.temp.sass.dir, 'custom-properties'))
    await fs.remove(path.join(paths.temp.sass.dir, 'grid'))
    await fs.remove(path.join(paths.temp.sass.dir, 'utilities'))
    await fs.remove(path.join(paths.temp.sass.dir, 'skeletor.scss'))
    await fs.remove(path.join(paths.temp.sass.dir, 'skeletor.vars.scss'))
  } else {
    // else kill the whole dir
    await fs.remove(paths.temp.sass.dir)
  }
  // now there's no rule-producing partials left, copy core for use
  // in downstream sass libraries (functions, mixins, config map)
  await fs.copy(paths.temp.dir, paths.dest.dir)
  // then remove temp dir
  await fs.remove(paths.temp.dir)
}

module.exports = main
