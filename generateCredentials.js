const crypto = require('crypto');

function generateSecureCode() {
    return crypto.randomBytes(16).toString('hex');
}

function generateSecureSecret() {
    return crypto.randomBytes(32).toString('hex');
}

const apiCode = generateSecureCode();
const apiSecret = generateSecureSecret();

console.log("API Code:", apiCode);
console.log("API Secret:", apiSecret);
