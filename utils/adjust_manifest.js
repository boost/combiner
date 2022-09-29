const env = require('./env');

module.exports = (content) => {
  const manifest = JSON.parse(content);

  const name = process.env.npm_package_name.charAt(0).toUpperCase() +
               process.env.npm_package_name.slice(1);
  manifest.name = name;
  manifest.short_name = name;
  manifest.description = process.env.npm_package_description;
  manifest.version = process.env.npm_package_version;
  manifest.author = process.env.npm_package_author;
  manifest.homepage_url = process.env.npm_package_homepage;
  return JSON.stringify(manifest, null, 2);
};
