// wordlists.js
// Load the configuration file
const fs = require('fs');
const config = require('./config');

// Function to load a word list for a given language
const loadWordList = (language) => {
  // Construct the file name for the word list
  const wordListFile = `words-${language}.txt`;
  try {
    // Read the word list file and split it into an array of words
    const wordList = fs.readFileSync(wordListFile, 'utf8').split('\n');
    return wordList;
  } catch (error) {
    // Throw an error if the word list file cannot be loaded
    throw new Error(`Failed to load word list for language ${language}: ${error.message}`);
  }
};

// Function to load word lists for all languages
const loadWordLists = () => {
  // Create an object to store the word lists
  const wordLists = {};
  // Iterate over the languages in the configuration
  config.languages.forEach((language) => {
    try {
      // Load the word list for the current language
      wordLists[language] = loadWordList(language);
    } catch (error) {
      // Throw an error if the word list cannot be loaded
      throw new Error(`Failed to load word lists: ${error.message}`);
    }
  });
  // Return the object containing the word lists
  return wordLists;
};

// Export the loadWordLists function
module.exports = loadWordLists;