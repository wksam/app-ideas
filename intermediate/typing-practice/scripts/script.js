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

        clearInterval(twinkleId);
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
        
        clearInterval(twinkleId);
        twinkleId = setInterval(twinkle, 400);

        return word;
    }

    function twinkle() {
        document.querySelector('.current').classList.toggle('twinkle');
    }

    document.querySelector('.input').addEventListener('keypress', onInputText);
    function onInputText(e) {
        const currentLetter = document.querySelector('.current');
        if(currentLetter.textContent.charCodeAt(0) === e.which) {
            const nextLetter = currentLetter.nextElementSibling;
            if(nextLetter) {
                currentLetter.classList.remove('current');
                currentLetter.classList.remove('twinkle');
                nextLetter.classList.add('current');
            } else {
                const totalAttempts = document.querySelector('.total .value');
                totalAttempts.textContent = parseInt(totalAttempts.textContent) + 1;

                if(document.querySelectorAll('.error').length === 0) {
                    const successfulAttempts = document.querySelector('.successful .value');
                    successfulAttempts.textContent = parseInt(successfulAttempts.textContent) + 1;
                }

                createWord();
                e.target.value = '';
                e.preventDefault();
            }
            document.documentElement.style.setProperty('--twinkle-color', '#343a40');
        } else {
            document.documentElement.style.setProperty('--twinkle-color', '#dc3545');
            currentLetter.classList.add('error');
            e.preventDefault();
        }
    }
})();