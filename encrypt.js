const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const prompt=require("prompt-sync")({sigint:true});
const crypto = require('crypto');


// Read the public key from "key-gen.html"
const publicKeyPath = path.join(__dirname, 'zrpl-test', 'key-pairs', 'key-gen.html');
const publicKeyContent = fs.readFileSync(publicKeyPath, 'utf-8');

// Extract the public key from the HTML content
const { window } = new JSDOM(publicKeyContent);
const publicKeyElement = window.document.querySelector('#public-key');
const publicKey = publicKeyElement.textContent;
// console.log(publicKey);

// Prompt the user to enter the keyword
const keyword = prompt('Enter the keyword:');

//encrypt keyword using the public Key
const encryptedKeyword=crypto.publicEncrypt({
  key:publicKey,
  padding:crypto.constants.RSA_PKCSI_OAEP_PADDING,
  oaepHash:"sha256",
},Buffer.from(keyword));

// Print the input and output
console.log('Input:', keyword);
console.log('Output:', encryptedKeyword.toString("base64"));
const encryptedKeyword1=encryptedKeyword.toString("base64")


// Store the input and output in "result.html"
const resultPath = path.join(__dirname, 'result.html');
const resultContent = `
<html>
<head>
  <title>Encryption Result</title>
</head>
<body>
  <h1>Encryption Result</h1>

  <h2>Input:</h2>
  <pre>${keyword}</pre>
  <h2>Output:</h2>
  <pre id="encrypted-key">${encryptedKeyword1}</pre>

  
</body>
</html>`;

fs.writeFileSync(resultPath, resultContent);
