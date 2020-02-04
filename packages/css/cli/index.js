#!/usr/bin/env node
const fs = require("fs-extra");
const path = require("path");
const yamlToJson = require("yamljs");
const jsonToSass = require("json-sass");
const spawn = require("cross-spawn");

function writeSassIndexByName(name, opts) {
  spawn.sync(
    "yarn",
    [
      "node-sass-chokidar",
      `./dist/sass/${name}.scss`,
      `./dist/${name}.css`,
      "--source-map",
      "true",
      "--output-style",
      "compact"
    ],
    opts
  );
  spawn.sync(
    "yarn",
    [
      "node-sass-chokidar",
      `./dist/sass/${name}.scss`,
      `./dist/${name}.min.css`,
      "--source-map",
      "true",
      "--output-style",
      "compressed"
    ],
    opts
  );
  spawn.sync("gzip", ["-k", `./dist/${name}.css`], opts);
  spawn.sync("gzip", ["-k", `./dist/${name}.min.css`], opts);
}

async function main({ config = "skeletor.yml" } = {}) {
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

  const opts = { stdio: "inherit", cwd: local };
  writeSassIndexByName("skeletor.all", opts);
  // writeSassIndexByName("vars", opts); // TODO: CSS vars
  writeSassIndexByName("skeletor.grid", opts);
  writeSassIndexByName("skeletor.utilities", opts);

  await fs.remove(path.join(destDir, "sass/grid"));
  await fs.remove(path.join(destDir, "sass/utilities"));
  await fs.remove(path.join(destDir, "sass/skeletor.all.scss"));
  await fs.remove(path.join(destDir, "sass/skeletor.grid.scss"));
  await fs.remove(path.join(destDir, "sass/skeletor.utilities.scss"));

  await fs.copy(destDir, path.join(cwd, "public/dist"));
}

// run
main();
