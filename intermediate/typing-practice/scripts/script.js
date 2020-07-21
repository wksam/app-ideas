(function() {
    document.querySelector('.start').addEventListener('click', onStartPractice);
    function onStartPractice(e) {
        toggleVisibility(e.currentTarget);
        toggleVisibility(document.querySelector('.stop'));

        document.querySelector('.word').textContent = randomWord();
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
})();