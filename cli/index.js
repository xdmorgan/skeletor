const fs = require("fs-extra");
const path = require("path");
const yamlToJson = require("yamljs");
const jsonToSass = require("json-sass");

(async () => {
  const asJson = yamlToJson.load("./config.yml");
  const cwd = process.cwd();
  const tempDir = path.join(cwd, ".temp");
  const tempJson = path.join(tempDir, "config.json");
  const destSass = path.join(cwd, "src", "_custom.scss");
  await fs.ensureDir(tempDir);
  await fs.writeFile(tempJson, JSON.stringify(asJson, undefined, 2));
  fs.createReadStream(tempJson)
    .pipe(jsonToSass({ prefix: "$skeletor: " }))
    .pipe(fs.createWriteStream(destSass));
  // await fs.remove(tempDir);
})();
