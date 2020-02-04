#!/usr/bin/env node
const fs = require("fs-extra");
const path = require("path");
const yamlToJson = require("yamljs");
const jsonToSass = require("json-sass");
const spawn = require("cross-spawn");

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

  const spawnopts = { stdio: "inherit", cwd: local };
  spawn.sync(
    "yarn",
    [
      "node-sass-chokidar",
      "./dist/sass/skeletor.scss",
      "./dist/skeletor.css",
      "--source-map",
      "true",
      "--output-style",
      "compact"
    ],
    spawnopts
  );
  spawn.sync(
    "yarn",
    [
      "node-sass-chokidar",
      "./dist/sass/skeletor.scss",
      "./dist/skeletor.min.css",
      "--source-map",
      "true",
      "--output-style",
      "compressed"
    ],
    spawnopts
  );
  spawn.sync("gzip", ["-k", "./dist/skeletor.css"], spawnopts);
  spawn.sync("gzip", ["-k", "./dist/skeletor.min.css"], spawnopts);

  await fs.copy(destDir, path.join(cwd, "public/dist"));
}

// run
main();
