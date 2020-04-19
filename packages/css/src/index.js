#!/usr/bin/env node
const fs = require('fs-extra')
const path = require('path')
const spawn = require('cross-spawn')
const { parse } = require('./parse-config')
const { render, pathsByEntryPointName } = require('./render-sass')

async function renderAndWriteByIndexName(name, dir, opts = {}) {
  const paths = pathsByEntryPointName(name, dir)
  const rendered = render({ src: paths.src, dest: paths.dest, ...opts })
  await fs.writeFile(paths.dest, rendered.styles)
  opts.sourceMap && (await fs.writeFile(paths.map, rendered.sourceMap))
}

async function main({ config, output, gzip, minify, sourcemap, sass } = {}) {
  const cwd = process.cwd()
  const local = path.join(__dirname, '..')
  const paths = {
    config: path.join(cwd, config),
  }

  // parse config file
  const parsed = await parse(paths.config)
  const asJsonString = JSON.stringify(parsed, undefined, 2)

  const srcDir = path.join(local, 'src')
  const destDir = path.join(local, 'temp')
  const srcSassDir = path.join(srcDir, 'sass')
  const destSassDir = path.join(destDir, 'sass')
  const tempJson = path.join(destDir, 'config.json')
  const sassConfig = path.join(destSassDir, '_config.scss')

  await fs.remove(destDir)
  await fs.copy(srcSassDir, destSassDir)
  await fs.writeFile(tempJson, asJsonString)

  spawn.sync('./node_modules/.bin/json-to-scss', [
    tempJson,
    sassConfig,
    '--p="$skeletor: "',
  ])

  const renderOptions = {
    outputStyle: minify ? 'compressed' : 'compact',
    sourceMap: !!sourcemap,
  }
  await renderAndWriteByIndexName('skeletor', destDir, renderOptions)
  await renderAndWriteByIndexName('skeletor.vars', destDir, renderOptions)

  if (sass) {
    // if we're copying over the Sass directory to cwd, we need to clean
    // up the non-core stuff which would produce duplicated rules
    await fs.remove(path.join(destSassDir, 'custom-properties'))
    await fs.remove(path.join(destSassDir, 'grid'))
    await fs.remove(path.join(destSassDir, 'utilities'))
    await fs.remove(path.join(destSassDir, 'skeletor.scss'))
    await fs.remove(path.join(destSassDir, 'skeletor.vars.scss'))
  } else {
    // else kill it
    await fs.remove(destSassDir)
  }

  // now there's no rule-producing partials left, copy core for use
  // in downstream sass libraries (functions, mixins, config map)
  await fs.copy(destDir, path.join(cwd, output))
  // remove temp dir
  await fs.remove(destDir)
}

module.exports = main
