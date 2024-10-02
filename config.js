// config.js
// Load the configuration file
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

// Validate the configuration file
if (!config || typeof config !== 'object') {
  // Throw an error if the configuration file is invalid
  throw new Error('Invalid configuration file');
}

// Validate the languages configuration
if (!config.languages || !Array.isArray(config.languages)) {
  // Throw an error if the languages configuration is invalid
  throw new Error('Invalid languages configuration');
}

// Validate the word count configuration
if (!config.wordCount || typeof config.wordCount !== 'number') {
  // Throw an error if the word count configuration is invalid
  throw new Error('Invalid word count configuration');
}

// Export the validated configuration
module.exports = config;