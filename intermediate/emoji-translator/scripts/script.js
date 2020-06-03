document.querySelector('form').addEventListener('submit', startTranslate);

function startTranslate(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    document.querySelector('#output').textContent = translate(formData.get('input'));
}

function translate(text) {
    let words = text.trim().split(/\s+/);
    let left = [];
    let result = [];
    while(true) {
        if(words.length === 0 && left.length === 0) break;
        if(emojis[words.join(' ')] !== undefined) {
            result.push(emojis[words.join(' ')]);
            words = left;
            left = [];
        } else if (words.length === 0) {
            result.push(left.shift());
            words = left;
            left = [];
        } else {
            left.unshift(words.pop());
        }
    }
    return result.join(' ');
}