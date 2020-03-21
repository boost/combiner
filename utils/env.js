module.exports = {
  NODE_ENV: (process.env.NODE_ENV || "development"),
  PORT: parseInt(process.env.PORT || 3000),
  BROWSER: (process.env.BROWSER || 'firefox')
};
