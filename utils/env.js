const browser = process.env.BROWSER || "firefox";
let outputDir = process.env.OUTPUT_DIR;
if (outputDir == undefined) {
  outputDir = browser == "firefox" ? "build-firefox" : "build-chrome";
}

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || 3000),
  BROWSER: browser,
  OUTPUT_DIR: outputDir,
};
