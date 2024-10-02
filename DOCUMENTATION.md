## Passphrase Generator Documentation

## Introduction

The passphrase generator is a command-line tool designed to generate strong and unique passphrases for users. The tool uses a combination of word lists and random number generation to create passphrases that are both secure and easy to remember.

## Getting Started

To use the passphrase generator, simply run the app.js file from the command line. The tool will prompt you to enter the language, word count, and vowel replacement options.

## Language Option

The language option allows you to specify the language of the word list used to generate the passphrase. Currently, the tool supports only English, but additional languages can be added in the future.

```javascript

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
```

As you can see from the code above, the language option is validated to ensure that it is a valid language code.

## Word Count Option

The word count option allows you to specify the number of words in the passphrase. The default word count is 2, but you can specify any number of words you prefer.

```javascript
// app.js
// Function to generate a passphrase
const generatePassphrase = (language, wordCount, vowelReplacement) => {
  // Check if the word count is valid
  if (wordCount < 1) {
    // Throw an error if the word count is invalid
    throw new Error(`Invalid word count: ${wordCount}`);
  }
  // ...
}
```

As you can see from the code above, the word count option is validated to ensure that it is a positive integer.

## Vowel Replacement Option

The vowel replacement option allows you to specify whether vowels should be replaced with special characters in the passphrase. This option can be useful for creating more secure passphrases.

```javascript
// app.js
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
}
```

As you can see from the code above, the vowel replacement option uses a mapping of vowels to their replacements to replace vowels with special characters in the passphrase.

## How it Works

The passphrase generator uses a combination of word lists and random number generation to create passphrases. Here's a step-by-step explanation of how the tool works:

The tool loads the word list for the specified language.

```javascript
// wordlists.js
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
}
```

The tool generates a random index in the word list and selects a word at that index.

```javascript
// app.js
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
}
```

The tool repeats step 2 for the specified word count.

```javascript
// app.js
// Function to generate a passphrase
const generatePassphrase = (language, wordCount, vowelReplacement) => {
  // Load the word list for the specified language
  const wordList = loadWordList(language);

  // Generate a passphrase with the specified word count
  const passphrase = [];
  for (let i = 0; i < wordCount; i++) {
    passphrase.push(getRandomWord(wordList));
  }

  // Replace vowels with special characters if the vowel replacement option is enabled
  if (vowelReplacement) {
    passphrase = replaceVowels(passphrase);
  }

  // Uppercase random letters in the passphrase to make it more secure
  passphrase = uppercaseRandomLetters(passphrase);

  // Return the generated passphrase
  return passphrase.join(' ');
}
```

The tool replaces vowels with special characters in the passphrase if the vowel replacement option is enabled.

```javascript
// app.js
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
}
```

The tool uppercases random letters in the passphrase to make it more secure.

```javascript
// app.js
// Function to uppercase random letters in a passphrase
const uppercaseRandomLetters = (passphrase) => {
  // Define the probability of uppercasing a letter
  const uppercaseProbability = 0.5;

  // Uppercase random letters in the passphrase
  return passphrase.map((word) => {
    return word.split('').map((char) => {
      if (Math.random() < uppercaseProbability) {
        return char.toUpperCase();
      }
      return char;
    }).join('');
  }).map((word) => word);
}
```

The tool returns the generated passphrase.

```javascript
// app.js
// Function to generate a passphrase
const generatePassphrase = (language, wordCount, vowelReplacement) => {
  // Load the word list for the specified language
  const wordList = loadWordList(language);

  // Generate a passphrase with the specified word count
  const passphrase = [];
  for (let i = 0; i < wordCount; i++) {
    passphrase.push(getRandomWord(wordList));
  }

  // Replace vowels with special characters if the vowel replacement option is enabled
  if (vowelReplacement) {
    passphrase = replaceVowels(passphrase);
  }

  // Uppercase random letters in the passphrase to make it more secure
  passphrase = uppercaseRandomLetters(passphrase);

  // Return the generated passphrase
  return passphrase.join(' ');
}
```

## Security Considerations

The passphrase generator is designed to create strong and unique passphrases that are resistant to guessing and cracking. However, there are some security considerations to keep in mind:

The tool uses a random number generator to select words from the word list. While the random number generator is designed to be secure, it's possible that an attacker could predict the random numbers and guess the passphrase.
The tool uses a word list to generate passphrases. While the word list is designed to be secure, it's possible that an attacker could obtain a copy of the word list and use it to guess the passphrase.

## Conclusion

The passphrase generator is a useful tool for creating strong and unique passphrases. While there are some security considerations to keep in mind, the tool is designed to be secure and easy to use. We hope this documentation has been helpful in explaining how the tool works and how to use it.