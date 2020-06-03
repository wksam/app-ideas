(function() {
    const choiceLetter = { 0: 'a) ', 1: 'b) ', 2: 'c) ', 3: 'd) ' };
    let shuffledDeck = shuffle(deck);
    let deckIndex = -1;

    document.querySelector('.next').addEventListener('click', getFlashCard);

    getFlashCard();
    function getFlashCard() {
        if(deckIndex < shuffledDeck.length) {
            createFlashCard(shuffledDeck[++deckIndex]);
        } else {

        }
    }

    function createFlashCard(cardData) {
        const flashCard = document.querySelector('.flashcard');
        flashCard.textContent = '';

        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.setAttribute('style', 'width: 290px;');

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
        } else {
            e.target.classList.add('correct');
            document.querySelectorAll('button.list-group-item').forEach(function(btn) {
                btn.classList.add('disabled');
            });
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
})();