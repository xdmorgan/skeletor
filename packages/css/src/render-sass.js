const path = require('path')
const sass = require('node-sass')

function pathsByEntryPointName(name, dir) {
  return {
    src: path.join(dir, `sass/${name}.scss`),
    dest: path.join(dir, `${name}.css`),
    map: path.join(dir, `${name}.css.map`),
  }
}

function render({ src, dest, outputStyle = 'compact', sourceMap = true } = {}) {
  const result = sass.renderSync({
    file: src,
    outFile: dest,
    outputStyle,
    sourceMap,
  })
  return {
    styles: result.css.toString(),
    ...(result.map ? { sourceMap: result.map.toString() } : {}),
  }
}

module.exports = { render, pathsByEntryPointName }
