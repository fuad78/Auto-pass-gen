const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static('public'));

// API endpoint for password generation
app.get('/api/generate-password', (req, res) => {
    const length = parseInt(req.query.length) || 12;
    const includeUppercase = req.query.uppercase === 'true';
    const includeLowercase = req.query.lowercase === 'true';
    const includeNumbers = req.query.numbers === 'true';
    const includeSymbols = req.query.symbols === 'true';
    
    const password = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
    res.json({ password });
});

function generatePassword(length, uppercase, lowercase, numbers, symbols) {
    let chars = '';
    if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) chars += '0123456789';
    if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    // If no character types selected, use all
    if (!chars) chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Password Generator App running on http://localhost:${PORT}`);
    console.log(`👨‍💻 Developed by Fuad Hasan`);
}); 