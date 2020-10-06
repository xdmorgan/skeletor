# @skeletor/css

Atomic CSS generator for rapid prototyping.

## Installation

```bash
# npm
npm i --save-dev @skeletor/css
# Yarn
yarn add --dev @skeletor/css
```

## CLI

```
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
  --vars-build     Produce a CSS custom properties build
  --core-build     Produce a core-only CSS build (debug flag, should be empty)

Examples
  $ skeletor --config config.yml --output dist
  Specify an alternate path to config file (default: ./skeletor.yml)
```

## Documentation

- [Config structure](https://github.com/xdmorgan/skeletor/tree/master/packages/css/docs/config-structure.md)
- [Generated proerty and class reference](https://github.com/xdmorgan/skeletor/tree/master/packages/css/docs/generated-properties.md)
- [Generated file structure](https://github.com/xdmorgan/skeletor/tree/master/packages/css/docs/index.md)
