// Assignment code here

//Default password length of 16
function generatePassword(length = 16, useSymbols, useNumbers) {
  /*
  A character range in ES6 would be nice, but a hardcoded string works fine.
  We avoid spaces and quotes in the password as those are sometimes problematic, but we could include them with an escape character.
  */
  const characterList = (useSymbols ? '!#$%&()*+,-./:;<=>?@[\]^_{|}~' : '') + 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' + (useNumbers ? '0123456789' : '');
  /*
  Using Math.random() for password generation would be insecure, as it does not use an entropy seeded PRNG. 
  Random values outputted from Math.random() can be predictable, resulting in insecure passwords.
  Here we use Crypto.getRandomValues(), which provides OS entropy seeded PRNG for secure password generation.
  Read more: https://owasp.org/www-community/vulnerabilities/Insecure_Randomness
  */
  const randomValues = new Uint32Array(length);
  self.crypto.getRandomValues(randomValues); //Pass by reference, randomValues is populated
  /*
  Map the randomValues array (converted to generic typed array) with a lambda that takes the modulus of the random 32bit unsigned integer and the length of the 
  character list for a truly random character selection.
  Note: In Typescript we could probably specify the type of the map returned array with an explicit cast, but in ES6 we 
  have to construct a generic array from the typed one and rely on an implicit cast in the map function.
  If we didn't, the map result would be implicitly casted to the Uint32Array type which isn't what we want.
  */
  return Array.from(randomValues) //Construct a generic array from randomValues
    .map(rnum => //Map the generic array across its random values
      characterList[rnum % characterList.length] //Returns a string type which the constructed generic array copy can hold sensibly
    ).join(''); //Join the string array of characters into a string
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {

  var pwLength = parseInt(document.querySelector("#lengthRange").value);
  var useSymbols = document.querySelector('#useSymbols').checked;
  var useNumbers = document.querySelector('#useNumbers').checked;

  var password = generatePassword(pwLength,useSymbols,useNumbers);
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
