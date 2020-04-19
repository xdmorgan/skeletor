const path = require('path')

function getFilePaths({ localDir, remoteDir, inFile, outDir } = {}) {
  return {
    config: path.join(remoteDir, inFile),
    src: {
      dir: path.join(localDir, 'src'),
      sass: path.join(localDir, 'src/sass'),
    },
    temp: {
      dir: path.join(localDir, 'temp'),
      json: path.join(localDir, 'temp/config.json'),
      sass: {
        config: path.join(localDir, 'temp/sass/_config.scss'),
        dir: path.join(localDir, 'temp/sass'),
      },
    },
    dest: {
      dir: path.join(remoteDir, outDir),
    },
  }
}

module.exports = { getFilePaths }
