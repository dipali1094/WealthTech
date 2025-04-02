const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const secretKey = process.env.ENCRYPTION_SECRET_KEY || 'your-encryption-secret-key';
const iv = crypto.randomBytes(16);  // Initialization vector for AES-256

// Encrypt data before storing it in DB
function encryptField(data) {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, 'utf-8'), iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { iv: iv.toString('hex'), encryptedData: encrypted };
}

// Decrypt data after fetching from DB
function decryptField(encryptedData) {
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey, 'utf-8'), Buffer.from(encryptedData.iv, 'hex'));
    let decrypted = decipher.update(encryptedData.encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = { encryptField, decryptField };
