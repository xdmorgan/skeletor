const path = require('path')
const { parse } = require('./parse-config')

describe('Load and parse yml config as json', () => {
  test('Read sample config', async () => {
    const file = path.join(__dirname, '../config.yml')
    expect(await parse(file)).toMatchInlineSnapshot(`
      Object {
        "breakpoints": Object {
          "sm": "420px",
        },
        "colors": Object {
          "blue": "#00f",
          "green": "#bada55",
          "purple": "rebeccapurple",
          "red": "red",
        },
        "container": Object {
          "initial": Object {
            "inset": "24px",
            "min": "320px",
          },
        },
        "dimensions": Object {
          "auto": "auto",
          "fill": "100%",
          "none": "none",
        },
        "displays": true,
        "font-families": Object {
          "system": Array [
            "-apple-system",
            "system-ui",
            "BlinkMacSystemFont",
            "Segoe UI",
            "Helvetica",
            "Arial",
            "sans-serif",
            "Apple Color Emoji",
            "Segoe UI Emoji",
            "Segoe UI Symbol",
          ],
        },
        "font-weights": Object {
          "bold": 700,
          "medium": 500,
          "normal": 400,
        },
        "grid": Object {
          "cols": 12,
          "gutter": "24px",
        },
        "line-heights": Object {
          "compact": 1,
          "default": 1.2,
          "spacious": 1.4,
        },
        "rounded-corners": Object {
          "pill": "999px",
          "round": "50%",
          "small": "2px",
        },
        "spacings": Object {
          "0": 0,
          "double": "16px",
          "half": "4px",
          "quad": "32px",
          "quarter": "2px",
          "single": "8px",
          "spacious": "12px",
          "square": "64px",
          "triple": "24px",
        },
        "z-indexes": Object {
          "modal": 200,
          "nav": 100,
          "orbit": 1000,
          "over": 1,
          "under": -1,
        },
      }
    `)
  })
})
