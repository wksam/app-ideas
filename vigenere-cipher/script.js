const plainInput = document.querySelector('#plain');
const cipherInput = document.querySelector('#cipher');
const keyInput = document.querySelector('#key');

const encryptButton = document.querySelector('#encrypt');
const decryptButton = document.querySelector('#decrypt');
const compareButton = document.querySelector('#compare');

plainInput.addEventListener('keypress', onTyping);
cipherInput.addEventListener('keypress', onTyping);
keyInput.addEventListener('keypress', onTyping)

function onTyping(e) {
    e.preventDefault();
    if(e.key.match(/[a-zA-Z]/g)) {
        this.value += e.key.toUpperCase();

        if(this.id == 'plain') {
            if(keyInput.value.length > 0) {
                decryptButton.disabled = true;
                if(cipherInput.value.length > 0) {
                    compareButton.disabled = false;
                    encryptButton.disabled = true;
                } else {
                    encryptButton.disabled = false;
                    compareButton.disabled = true;
                }
            }
        } else if(this.id == 'cipher') {
            if(keyInput.value.length > 0) {
                encryptButton.disabled = true;
                if(plainInput.value.length > 0) {
                    compareButton.disabled = false;
                    decryptButton.disabled = true;
                } else {
                    decryptButton.disabled = false;
                    compareButton.disabled = true;
                }
            }
        } else {
            if(plainInput.value.length > 0) {
                decryptButton.disabled = true;
                if(cipherInput.value.length > 0) {
                    compareButton.disabled = false;
                    encryptButton.disabled = true;
                } else {
                    encryptButton.disabled = false;
                    compareButton.disabled = true;
                }
            } else if(cipherInput.value.length > 0) {
                decryptButton.disabled = false;
                compareButton.disabled = true;
                encryptButton.disabled = true;
            }
        }
    }
}

plainInput.addEventListener('keyup', onBackspaceDown);
cipherInput.addEventListener('keyup', onBackspaceDown);
keyInput.addEventListener('keyup', onBackspaceDown);

function onBackspaceDown(e) {
    if((e.which == 8 || e.which == 46) && this.value.length == 0) {
        document.querySelector('#compare').disabled = true;
        if(this.id == 'plain' && cipherInput.value.length > 0 && keyInput.value.length > 0) {
            decryptButton.disabled = false;
            compareButton.disabled = true;
            encryptButton.disabled = true;
        }
        else if(this.id == 'cipher' && plainInput.value.length > 0 && keyInput.value.length > 0) {
            encryptButton.disabled = false;
            compareButton.disabled = true;
            decryptButton.disabled = true;
        } else {
            decryptButton.disabled = true;
            compareButton.disabled = true;
            encryptButton.disabled = true;
        }
    }
}

plainInput.addEventListener('paste', onPaste);
cipherInput.addEventListener('paste', onPaste);

function onPaste(e) {
    e.preventDefault();
}