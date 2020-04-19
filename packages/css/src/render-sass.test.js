const path = require('path')
const { render, pathsByEntryPointName } = require('./render-sass')

describe('render()', () => {
  test('Renders main css file with default settings', () => {
    const src = path.join(__dirname, 'sass/skeletor.scss')
    const dest = path.join(__dirname, 'skeletor.css')
    const { styles, sourceMap } = render({ src, dest })
    expect(typeof styles).toBe('string')
    expect(typeof sourceMap).toBe('string')
    expect(styles).toMatchSnapshot()
  })
  test('Renders vars-only css file with default settings', () => {
    const src = path.join(__dirname, 'sass/skeletor.vars.scss')
    const dest = path.join(__dirname, 'skeletor.vars.css')
    const { styles, sourceMap } = render({ src, dest })
    expect(typeof styles).toBe('string')
    expect(typeof sourceMap).toBe('string')
    expect(styles).toMatchSnapshot()
  })
  test('Renders main css file with custom optional settings', () => {
    const src = path.join(__dirname, 'sass/skeletor.scss')
    const dest = path.join(__dirname, 'skeletor.css')
    const { styles, sourceMap } = render({
      src,
      dest,
      outputStyle: 'compressed',
      sourceMap: false,
    })
    expect(typeof styles).toBe('string')
    expect(typeof sourceMap).toBe('undefined')
    expect(styles).toMatchSnapshot()
  })
})

describe('pathsByEntryPointName()', () => {
  test('Shorthand to src and dest paths', () => {
    expect(pathsByEntryPointName('skeletor', '')).toMatchInlineSnapshot(`
      Object {
        "dest": "skeletor.css",
        "map": "skeletor.css.map",
        "src": "sass/skeletor.scss",
      }
    `)
    expect(pathsByEntryPointName('skeletor.vars', 'some_base/dir/'))
      .toMatchInlineSnapshot(`
      Object {
        "dest": "some_base/dir/skeletor.vars.css",
        "map": "some_base/dir/skeletor.vars.css.map",
        "src": "some_base/dir/sass/skeletor.vars.scss",
      }
    `)
  })
})
