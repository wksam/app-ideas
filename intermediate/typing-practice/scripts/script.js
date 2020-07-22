(function() {
    document.querySelector('.start').addEventListener('click', onStartPractice);
    function onStartPractice(e) {
        toggleVisibility(e.currentTarget);
        toggleVisibility(document.querySelector('.stop'));

        createWord();
        const input = document.querySelector('.input');
        input.disabled = false;
        input.focus();
    }

    document.querySelector('.stop').addEventListener('click', onStopPractice);
    function onStopPractice(e) {
        toggleVisibility(e.currentTarget);
        toggleVisibility(document.querySelector('.start'));

        document.querySelector('.word').textContent = 'Click "Start Practice"';
        const input = document.querySelector('.input');
        input.disabled = true;
        input.value = '';
    }

    function toggleVisibility(element) {
        element.classList.toggle('d-none');
    }

    function randomWord() {
        return words[Math.floor(Math.random() * words.length)];
    }

    function createSpan(letter, isCurrent) {
        const span = document.createElement('span');
        if(isCurrent) span.setAttribute('class', 'current');
        span.textContent = letter;
        return span;
    }

    let twinkleId;
    function createWord() {
        const wordContainer = document.querySelector('.word');
        wordContainer.textContent = '';

        const word = randomWord();
        let first = true;
        for (const letter of word) {
            wordContainer.append(createSpan(letter, first));
            first = false;
        }

        twinkleId = setInterval(twinkle, 400);
    }

    function twinkle() {
        document.querySelector('.current').classList.toggle('twinkle');
    }

    document.querySelector('.input').addEventListener('keypress', onInputText);
    function onInputText(e) {
        const currentLetter = document.querySelector('.current');
        if(currentLetter.textContent.charCodeAt(0) === e.which) {
            const nextLetter = currentLetter.nextElementSibling;
            currentLetter.classList.remove('current');
            currentLetter.classList.remove('twinkle');
            nextLetter.classList.add('current');
            document.documentElement.style.setProperty('--twinkle-color', '#343a40');
        } else {
            document.documentElement.style.setProperty('--twinkle-color', '#dc3545');
            currentLetter.classList.add('error');
            e.preventDefault();
        }
    }
})();