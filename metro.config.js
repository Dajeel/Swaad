// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

// keep .cjs files in the bundle
defaultConfig.resolver.sourceExts.push("cjs");

// disable the new package-exports check so Expo Go can load older packages
defaultConfig.resolver.unstable_enablePackageExports = false;

module.exports = defaultConfig;
