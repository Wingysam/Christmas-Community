const uuid = require('uuid/v4');
const path = require('path');
const fs = require('fs');

const secretFilePath = path.join(__dirname, 'secret.txt');

try {
  module.exports = fs.readFileSync(secretFilePath).toString();
} catch (_) {
  const secret = uuid();
  fs.writeFileSync(secretFilePath, secret);
  module.exports = secret;
}