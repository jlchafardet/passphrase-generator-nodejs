// app.js
// Import the logger instance
const logger = require('./logger');
// Import the configuration file
const config = require('./config');
// Import the word lists
const wordLists = require('./wordlists')();
// Import the yargs library
const yargs = require('yargs');

// Function to generate a passphrase
const generatePassphrase = (language, wordCount, vowelReplacement) => {
  // Check if the language is valid
  if (!wordLists[language]) {
    // Throw an error if the language is invalid
    throw new Error(`Invalid language: ${language}`);
  }

  // Check if the word count is valid
  if (wordCount < 1) {
    // Throw an error if the word count is invalid
    throw new Error(`Invalid word count: ${wordCount}`);
  }

  // Get the word list for the given language
  const wordList = wordLists[language];
  // Create an array to store the passphrase
  let passphrase = [];

  // Iterate over the word count
  for (let i = 0; i < wordCount; i++) {
    // Get a random word from the word list
    const word = getRandomWord(wordList).replace(/\r/g, '');
    // Add the word to the passphrase
    passphrase.push(word);
  }

  // If vowel replacement is enabled, replace vowels with special characters
  if (vowelReplacement) {
    passphrase = replaceVowels(passphrase);
  }

  // Uppercase random letters in the passphrase
  passphrase = uppercaseRandomLetters(passphrase);

  // Return the generated passphrase
  return passphrase.join(' ');
};

// Function to get a random word from a word list
const getRandomWord = (wordList) => {
  // Check if the word list is empty
  if (!wordList || wordList.length === 0) {
    // Throw an error if the word list is empty
    throw new Error('Word list is empty');
  }

  // Get a random index in the word list
  const randomIndex = Math.floor(Math.random() * wordList.length);
  // Return the word at the random index
  return wordList[randomIndex];
};

// Function to replace vowels with special characters
const replaceVowels = (passphrase) => {
  // Define the vowels and their replacements
  const vowels = 'aeio';
  const replacements = '@310';
  const vowelMap = {};

  // Create a mapping of vowels to their replacements
  for (let i = 0; i < vowels.length; i++) {
    vowelMap[vowels[i]] = replacements[i];
  }

  // Replace vowels with their replacements in the passphrase
  return passphrase.map((word) => {
    return word.split('').map((char) => {
      if (vowelMap[char]) {
        return vowelMap[char];
      }
      return char;
    }).join('');
  }).map((word) => word);
};

// Function to uppercase random letters in the passphrase
const uppercaseRandomLetters = (passphrase) => {
  // Uppercase random letters in the passphrase
  return passphrase.map((word) => {
    const randomIndex = Math.floor(Math.random() * word.length);
    return word.substring(0, randomIndex) + word[randomIndex].toUpperCase() + word.substring(randomIndex + 1);
  }).map((word) => word);
};

// Main function
const main = () => {
  try {
    // Parse the command-line arguments
    const argv = yargs
      .option('language', {
        alias: 'l',
        type: 'string',
        default: 'en',
        describe: 'Language of the word list',
      })
      .option('word-count', {
        alias: 'w',
        type: 'number',
        default: 2,
        describe: 'Number of words in the passphrase',
      })
      .option('vowel-replacement', {
        alias: 'v',
        type: 'boolean',
        default: false,
        describe: 'Replace vowels with special characters',
      })
      .argv;

    // Get the language, word count, and vowel replacement from the command-line arguments
    const language = argv.language;
    const wordCount = argv['word-count'];
    const vowelReplacement = argv['vowel-replacement'];

    // Log the word count
    logger.info(`Word count: ${wordCount}`);
    // Generate a passphrase
    let passphrase = generatePassphrase(language, wordCount, vowelReplacement);
    // Log the generated passphrase
    console.log(`The generated passphrase is: ${passphrase}`);
    // Log a message indicating that a new passphrase was generated
    logger.info(`Generated a new passphrase with ${wordCount} words`);

  } catch (error) {
    // Log an error message if an error occurs
    logger.error(`Error generating passphrase: ${error.message}`);
  }
};

// Call the main function
main();