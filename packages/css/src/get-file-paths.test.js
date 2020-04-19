const { getFilePaths } = require('./get-file-paths')

describe('render()', () => {
  test('Renders main css file with default settings', () => {
    const paths = getFilePaths({
      localDir: '/local',
      remoteDir: '/remote',
      inFile: 'skeletor.yml',
      outDir: 'styles/skeletor',
    })
    expect(paths).toMatchInlineSnapshot(`
      Object {
        "config": "/remote/skeletor.yml",
        "dest": Object {
          "dir": "/remote/styles/skeletor",
        },
        "src": Object {
          "dir": "/local/src",
          "sass": "/local/src/sass",
        },
        "temp": Object {
          "dir": "/local/temp",
          "json": "/local/temp/config.json",
          "sass": Object {
            "config": "/local/temp/sass/_config.scss",
            "dir": "/local/temp/sass",
          },
        },
      }
    `)
  })
})
