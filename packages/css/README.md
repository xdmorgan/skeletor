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
  --config, -C     Specify config file (or ./skeletor.yml)
  --output, -O     Specify output folder (or ./skeletor)
  --gzip           Enable gzip of outputs (system command)
  --no-sass        Disable output of Sass core
  --no-minify      Disable output of minified outputs
  --no-sourcemap   Disable output of sourcemaps

Examples
  $ yarn skeletor --config styles/base.yml --output public --gzip --no-sass
  $ npm run skeletor [options]
```

## Documentation

- [Config structure](https://github.com/xdmorgan/skeletor/tree/master/packages/css/docs/index.md)
- [Generated proerty and class reference](https://github.com/xdmorgan/skeletor/tree/master/packages/css/docs/index.md)
- [Generated file structure](https://github.com/xdmorgan/skeletor/tree/master/packages/css/docs/index.md)
