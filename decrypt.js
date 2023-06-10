const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const crypto = require('crypto');

// Read the private key from "key-gen.html"
const privateKeyPath = path.join(__dirname, 'zrpl-test', 'key-pairs', 'key-gen.html');
const privateKeyContent = fs.readFileSync(privateKeyPath, 'utf-8');

// Extract the private key from the HTML content
const { window } = new JSDOM(privateKeyContent);
const privateKeyElement = window.document.querySelector('#private-key');
const privateKey = privateKeyElement.textContent;
// console.log(privateKey);

// Read the encrypted keyword from "result.html"
const resultPath = path.join(__dirname, 'result.html');
const resultContent = fs.readFileSync(resultPath, 'utf-8');
const { window: resultWindow } = new JSDOM(resultContent);
const encryptedKeywordElement = resultWindow.document.querySelector('#encrypted-key');
const encryptedKeyword = encryptedKeywordElement.textContent;
// console.log("encrypt  :",encryptedKeyword);

// Decrypt the encrypted keyword using the private key
const decryptedString=crypto.privateDecrypt({
  key:privateKey,
  padding:crypto.constants.RSA_PKCSI_OAEP_PADDING,
  oaepHash:"sha256",
},Buffer.from(encryptedKeyword, 'base64')).toString();


const decryptedKeyword = decryptedString;


// Print the decryption results
console.log('Decryption Result:');
console.log('Encrypted Keyword:', encryptedKeyword);
console.log('Decrypted Keyword:', decryptedKeyword);




