const fs = require('fs');
const crypto = require('crypto');

// generate Private and Public key pairs
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

// Convert keys to PEM format
const privateKeyPem = privateKey.export({ type: 'pkcs1', format: 'pem' });
const publicKeyPem = publicKey.export({ type: 'pkcs1', format: 'pem' });

// Prepare the HTML content
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Generated Key Pairs</title>
</head>
<body>
  <h1>Generated Key Pairs</h1>
  <h2>Private Key</h2>
  <pre id="private-key">${privateKeyPem}</pre>
  <h2>Public Key</h2>
  <pre id="public-key">${publicKeyPem}</pre>
</body>
</html>
`;

//save the result in “key-gen.html” in “zrpl-test/key-pairs” directory
// Create the directories if they don't exist
const directory = 'zrpl-test/key-pairs';
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory, { recursive: true });
}

// Save the result in key-gen.html
fs.writeFile(`${directory}/key-gen.html`, htmlContent, (err) => {
  if (err) throw err;
  console.log('Key pairs generated and saved successfully!');
});
