const env = require('./env');

module.exports = (content, path) => {
  const manifest = JSON.parse(content);
  if (env.NODE_ENV == 'production') {
    delete manifest.content_security_policy;
  }
  if (env.NODE_ENV == 'development') {
    delete manifest.content_scripts[0].css;
  }
  if (env.BROWSER == 'chrome') {
    delete manifest.sidebar_action;
    delete manifest.commands._execute_sidebar_action;
  }
  manifest.name = process.env.npm_package_name;
  manifest.short_name = process.env.npm_package_name;
  manifest.description = process.env.npm_package_description;
  manifest.version = process.env.npm_package_version;
  manifest.author = process.env.npm_package_author;
  manifest.homepage_url = process.env.npm_package_homepage;
  return JSON.stringify(manifest, null, 2);
};
