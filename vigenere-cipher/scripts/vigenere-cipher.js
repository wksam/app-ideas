function generateKey(plainText, keyText) {
    if(plainText.length > keyText.length) {
        const temp = keyText;
        for (let keyLength = temp.length; keyLength < plainText.length; keyLength++) {
            keyText += temp[keyLength % temp.length];
        }
        return keyText;
    } else {
        return keyText.substring(0, plainText.length);
    }
}

function encryptText(plainText, keyText) {
    const codeChars = []
    for (let i = 0; i < plainText.length; i++) {
        codeChars.push(((plainText.charCodeAt(i) + keyText.charCodeAt(i)) % 26) + 65);
    }
    return String.fromCharCode(...codeChars);
}

function decryptText(plainText, keyText) {
    const codeChars = []
    for (let i = 0; i < plainText.length; i++) {
        codeChars.push(((plainText.charCodeAt(i) - keyText.charCodeAt(i) + 26) % 26) + 65);
    }
    return String.fromCharCode(...codeChars);
}