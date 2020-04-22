String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

class Lipsum {
    constructor() {
        this.firstSentence = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
        this.words = ['a', 'ac', 'accumsan', 'ad', 'adipiscing', 'aenean', 'aliquam', 'aliquet', 'amet', 'ante', 'aptent', 
            'arcu', 'at', 'auctor', 'augue', 'bibendum', 'blandit', 'class', 'commodo', 'condimentum', 'congue', 'consectetur', 
            'consequat', 'conubia', 'convallis', 'cras', 'cubilia', 'curabitur', 'curae', 'cursus', 'dapibus', 'diam', 'dictum', 
            'dictumst', 'dignissim', 'dis', 'dolor', 'donec', 'dui', 'duis', 'efficitur', 'egestas', 'eget', 'eleifend', 
            'elementum', 'elit', 'enim', 'erat', 'eros', 'est', 'et', 'etiam', 'eu', 'euismod', 'ex', 'facilisi', 'facilisis', 
            'fames', 'faucibus', 'felis', 'fermentum', 'feugiat', 'finibus', 'fringilla', 'fusce', 'gravida', 'habitant', 
            'habitasse', 'hac', 'hendrerit', 'himenaeos', 'iaculis', 'id', 'imperdiet', 'in', 'inceptos', 'integer', 'interdum', 
            'ipsum', 'justo', 'lacinia', 'lacus', 'laoreet', 'lectus', 'leo', 'libero', 'ligula', 'litora', 'lobortis', 'lorem', 
            'luctus', 'maecenas', 'magna', 'magnis', 'malesuada', 'massa', 'mattis', 'mauris', 'maximus', 'metus', 'mi', 
            'molestie', 'mollis', 'montes', 'morbi', 'mus', 'nam', 'nascetur', 'natoque', 'nec', 'neque', 'netus', 'nibh', 
            'nisi', 'nisl', 'non', 'nostra', 'nulla', 'nullam', 'nunc', 'odio', 'orci', 'ornare', 'parturient', 'pellentesque', 
            'penatibus', 'per', 'pharetra', 'phasellus', 'placerat', 'platea', 'porta', 'porttitor', 'posuere', 'potenti', 
            'praesent', 'pretium', 'primis', 'proin', 'pulvinar', 'purus', 'quam', 'quis', 'quisque', 'rhoncus', 'ridiculus', 
            'risus', 'rutrum', 'sagittis', 'sapien', 'scelerisque', 'sed', 'sem', 'semper', 'senectus', 'sit', 'sociosqu', 
            'sodales', 'sollicitudin', 'suscipit', 'suspendisse', 'taciti', 'tellus', 'tempor', 'tempus', 'tincidunt', 
            'torquent', 'tortor', 'tristique', 'turpis', 'ullamcorper', 'ultrices', 'ultricies', 'urna', 'ut', 'varius', 
            'vehicula', 'vel', 'velit', 'venenatis', 'vestibulum', 'vitae', 'vivamus', 'viverra', 'volutpat', 'vulputate'];
    }

    randomNumber(min, max) {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }

    randomWord() {
        return this.words[this.randomNumber(0, this.words.length)];
    }

    randomWords(numWords) {
        let words = '';
        for (let i = 0; i < numWords; i++) {
            words += this.randomWord() + ' ';
        }
        return words.trim();
    }

    randomSentence(numWords) {
        let sentence = '';
        for (let i = 0; i < numWords; i++) {
            sentence += this.randomWords(this.randomNumber(3, 6)) + ', ';
        }
        sentence = sentence.capitalize();
        return sentence.substring(0, sentence.length - 2);
    }

    randomParagraph(numSentences) {
        let paragraph = '';
        for (let i = 0; i < numSentences; i++) {
            paragraph += this.randomSentence(this.randomNumber(1, 3)) + '. ';
        }
        return paragraph.trim();
    }

    randomParagraphs(numParagraph) {
        let text = '';
        for (let i = 0; i < numParagraph; i++) {
            text += this.randomParagraph(this.randomNumber(6, 12)) + '\n\n';
        }
        return text.substring(0, text.length - 1);
    }
}