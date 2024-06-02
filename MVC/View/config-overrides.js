// config-overrides.js
module.exports = function override(config, env) {
    // Suppress source map warnings
    config.ignoreWarnings = [/Failed to parse source map/];
    return config;
  };
  