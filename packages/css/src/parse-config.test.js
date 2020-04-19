const path = require('path')
const { parse } = require('./parse-config')

describe('parse()', () => {
  test('Load and parse yml config as json', async () => {
    const file = path.join(__dirname, '../config.yml')
    expect(await parse(file)).toMatchInlineSnapshot(`
      Object {
        "breakpoints": Object {
          "lg": "1024px",
          "md": "768px",
          "sm": "420px",
        },
        "colors": Object {
          "abbey": "#575A5C",
          "alabaster": "#f8f8f8",
          "black": "#000000",
          "shark": "#252729",
          "silver": "#BCBDBE",
          "tundora": "#454647",
          "white": "#FFFFFF",
        },
        "container": Object {
          "initial": Object {
            "inset": "24px",
            "max": "1400px",
            "min": "272px",
          },
          "md": Object {
            "inset": "48px",
            "max": "1400px",
          },
        },
        "dimensions": Object {
          "auto": "auto",
          "fill": "100%",
          "none": "none",
        },
        "displays": true,
        "flex": true,
        "font-families": Object {
          "body": Array [
            "Inter",
            "-apple-system",
            "system-ui",
            "BlinkMacSystemFont",
            "Segoe UI",
            "Helvetica",
            "Arial",
            "sans-serif",
          ],
          "heading": Array [
            "Lora",
            "serif",
          ],
        },
        "font-weights": Object {
          "bold": 700,
          "normal": 400,
        },
        "line-heights": Object {
          "compact": 1.1,
          "default": 1.5,
        },
        "normalize": true,
        "rounded-corners": Object {
          "none": 0,
          "round": "50%",
          "small": "4px",
        },
        "spacings": Object {
          "0": 0,
          "05x": "4px",
          "10x": "80px",
          "1x": "8px",
          "2x": "16px",
        },
        "z-indexes": Object {
          "over": 1,
          "under": -1,
        },
      }
    `)
  })
})
