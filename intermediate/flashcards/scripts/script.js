(function() {
    const choiceLetter = { 0: 'a) ', 1: 'b) ', 2: 'c) ', 3: 'd) ' };
    let shuffledDeck = shuffle(deck);
    let deckIndex = -1;
    
    let correctCount = 0;
    let wrongCount = 0;

    document.querySelector('.next').addEventListener('click', getFlashCard);
    document.querySelector('.result').addEventListener('click', getResults);
    document.querySelector('.reset').addEventListener('click', resetResults);
    document.querySelector('.reshuffle').addEventListener('click', reshuffleButton);

    getFlashCard();
    function getFlashCard() {
        document.querySelector('.results').style.display = 'none';
        deckIndex++;
        
        if(noMoreCards()) reshuffle();
        if(isLastCard()) document.querySelector('.next').textContent = 'Reshuffle';
        else document.querySelector('.next').textContent = 'Next';

        createFlashCard(shuffledDeck[deckIndex]);
    }

    function noMoreCards() {
        return (deckIndex + 1) > shuffledDeck.length;
    }

    function isLastCard() {
        return (deckIndex + 1) === shuffledDeck.length;
    }

    function createFlashCard(cardData) {
        const flashCard = document.querySelector('.flashcard');
        flashCard.textContent = '';

        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const cardBody = document.createElement('div');
        cardBody.setAttribute('class', 'card-body');

        const question = document.createElement('p');
        question.setAttribute('class', 'card-text');
        question.textContent = cardData.question;
        cardBody.append(question);
        card.append(cardBody)

        const choiceContainer = document.createElement('div');
        choiceContainer.setAttribute('class', 'list-group list-group-flush');

        const choices = shuffle([cardData.answer, ...cardData.choices]);
        for (const index in choices) {
            const choiceButton = document.createElement('button');
            choiceButton.setAttribute('class', 'list-group-item list-group-item-action');
            choiceButton.textContent = choiceLetter[index] + choices[index];
            choiceButton.addEventListener('click', choiceAction);
            choiceContainer.append(choiceButton);
        }

        card.append(choiceContainer);
        flashCard.append(card);
    }

    function choiceAction(e) {
        const choice = removeLetter(e.target.textContent);
        if(shuffledDeck[deckIndex].answer !== choice) {
            e.target.classList.add('wrong');
            document.querySelectorAll('button.list-group-item').forEach(function(btn) {
                if(removeLetter(btn.textContent) === shuffledDeck[deckIndex].answer)
                    btn.classList.add('correct');
                btn.classList.add('disabled');
            });
            wrongCount++;
        } else {
            e.target.classList.add('correct');
            document.querySelectorAll('button.list-group-item').forEach(function(btn) {
                btn.classList.add('disabled');
            });
            correctCount++;
        }
    }

    function removeLetter(text) {
        return text.slice(3, text.length);
    }

    function shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    function reshuffle() {
        shuffledDeck = shuffle(deck);
        deckIndex = 0;
    }

    function getResults() {
        const results = document.querySelector('.results');
        if (results.style.display === 'none') {
            results.style.display = 'block';
            results.querySelector('.correctCount').textContent = correctCount;
            results.querySelector('.wrongCount').textContent = wrongCount;
        } else {
            results.style.display = 'none';
        }
    }

    function resetResults() {
        correctCount = 0;
        wrongCount = 0;
        document.querySelector('.correctCount').textContent = correctCount;
        document.querySelector('.wrongCount').textContent = wrongCount;
    }

    function reshuffleButton() {
        deckIndex = shuffledDeck.length;
        getFlashCard();
    }
})();