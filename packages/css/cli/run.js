#!/usr/bin/env node
const fs = require("fs-extra");
const path = require("path");
const yaml = require("yaml");
const sass = require("node-sass");
const spawn = require("cross-spawn");

async function writeSassIndexByName(name, opts) {
  const src = path.join(__dirname, `../temp/sass/${name}.scss`);
  const dest = path.join(__dirname, `../temp/${name}.css`);
  // const maps = ["--source-map", String(opts.flags.sourcemap)];
  const result = sass.renderSync({
    file: src,
    outFile: dest,
    outputStyle: "compact",
    sourceMap: true,
  });
  await fs.writeFile(dest, result.css);
  // if (opts.flags.gzip) {
  // spawn.sync("gzip", ["-k", `./temp/${name}.css`], opts.std);
  // }

  // if (opts.flags.minify) {
  // spawn.sync(
  //   "yarn",
  //   [cmd, dest, `./temp/${name}.min.css`, ...maps, ...compressed],
  //   opts.std
  // );

  // if (opts.flags.gzip) {
  //   spawn.sync("gzip", ["-k", `./temp/${name}.min.css`], opts.std);
  // }
  // }
}

async function main({ config, output, gzip, minify, sourcemap, sass } = {}) {
  const cwd = process.cwd();
  const local = path.join(__dirname, "..");
  const paths = {
    config: path.join(cwd, config),
  };
  const asYamlString = await fs.readFile(paths.config, "utf8");
  const asJsonObject = yaml.parse(asYamlString);
  const asJsonString = JSON.stringify(asJsonObject, undefined, 2);

  const srcDir = path.join(local, "src");
  const destDir = path.join(local, "temp");
  const srcSassDir = path.join(srcDir, "sass");
  const destSassDir = path.join(destDir, "sass");
  const tempJson = path.join(destDir, "config.json");
  const sassConfig = path.join(destSassDir, "_config.scss");

  await fs.remove(destDir);
  await fs.copy(srcSassDir, destSassDir);
  await fs.writeFile(tempJson, asJsonString);

  spawn.sync("./node_modules/.bin/json-to-scss", [
    tempJson,
    sassConfig,
    '--p="$skeletor: "',
  ]);

  const opts = {
    flags: { gzip, minify, sourcemap },
    std: { stdio: "inherit", cwd: local },
  };

  await writeSassIndexByName("skeletor", opts);
  await writeSassIndexByName("skeletor.vars", opts);

  if (sass) {
    // if we're copying over the Sass directory to cwd, we need to clean
    // up the non-core stuff which would produce duplicated rules
    await fs.remove(path.join(destSassDir, "custom-properties"));
    await fs.remove(path.join(destSassDir, "grid"));
    await fs.remove(path.join(destSassDir, "utilities"));
    await fs.remove(path.join(destSassDir, "skeletor.scss"));
    await fs.remove(path.join(destSassDir, "skeletor.vars.scss"));
  } else {
    // else kill it
    await fs.remove(destSassDir);
  }

  // now there's no rule-producing partials left, copy core for use
  // in downstream sass libraries (functions, mixins, config map)
  await fs.copy(destDir, path.join(cwd, output));
  // remove temp dir
  await fs.remove(destDir);
}

module.exports = main;
