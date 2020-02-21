#!/usr/bin/env node
const fs = require("fs-extra");
const path = require("path");
const yamlToJson = require("yamljs");
const jsonToSass = require("json-sass");
const spawn = require("cross-spawn");

function writeSassIndexByName(name, opts) {
  const cmd = "node-sass-chokidar";
  const dest = `./dist/sass/${name}.scss`;
  const maps = ["--source-map", String(opts.flags.sourcemap)];
  const compact = ["--output-style", "compact"];
  const compressed = ["--output-style", "compressed"];
  spawn.sync(
    "yarn",
    [cmd, dest, `./dist/${name}.css`, ...maps, ...compact],
    opts.std
  );
  if (opts.flags.gzip) {
    spawn.sync("gzip", ["-k", `./dist/${name}.css`], opts.std);
  }

  if (opts.flags.minify) {
    spawn.sync(
      "yarn",
      [cmd, dest, `./dist/${name}.min.css`, ...maps, ...compressed],
      opts.std
    );

    if (opts.flags.gzip) {
      spawn.sync("gzip", ["-k", `./dist/${name}.min.css`], opts.std);
    }
  }
}

async function main({ config, output, gzip, minify, sourcemap, sass } = {}) {
  const cwd = process.cwd();
  const local = path.join(__dirname, "..");
  const paths = {
    config: path.join(cwd, config)
  };
  const asJsonObject = yamlToJson.load(paths.config);
  const asJsonString = JSON.stringify(asJsonObject, undefined, 2);
  const srcDir = path.join(local, "src");
  const destDir = path.join(local, "dist");
  const destSassDir = path.join(destDir, "sass");
  const tempJson = path.join(destDir, "config.json");
  const sassConfig = path.join(destSassDir, "_config.scss");
  await fs.remove(destDir);
  await fs.copy(srcDir, destSassDir);
  await fs.writeFile(tempJson, asJsonString);

  await new Promise(resolve => {
    fs.createReadStream(tempJson)
      .pipe(jsonToSass({ prefix: "$skeletor: " }))
      .pipe(fs.createWriteStream(sassConfig))
      .on("finish", resolve);
  });

  const opts = {
    flags: { gzip, minify, sourcemap },
    std: { stdio: "inherit", cwd: local }
  };

  writeSassIndexByName("skeletor", opts);
  writeSassIndexByName("skeletor.vars", opts);

  if (sass) {
    // if we're copying over the Sass directory to cwd, we need to clean
    // up the non-core stuff which would produce duplicated rules
    await fs.remove(path.join(destDir, "sass/custom-properties"));
    await fs.remove(path.join(destDir, "sass/grid"));
    await fs.remove(path.join(destDir, "sass/utilities"));
    await fs.remove(path.join(destDir, "sass/skeletor.scss"));
    await fs.remove(path.join(destDir, "sass/skeletor.vars.scss"));
  } else {
    // else kill it
    await fs.remove(path.join(destDir, "sass"));
  }

  // now there's no rule-producing partials left, copy core for use
  // in downstream sass libraries (functions, mixins, config map)
  await fs.copy(destDir, path.join(cwd, output));
  // remove temp dir
  await fs.remove(destDir);
}

module.exports = main;
