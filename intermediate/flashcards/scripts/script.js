(function() {
    function getFlashCard() {

    }

    createFlashCard(deck[0]);
    const choiceLetter = { 0: 'a) ', 1: 'b) ', 2: 'c) ', 3: 'd) ' };
    function createFlashCard(cardData) {
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
            choiceContainer.append(choiceButton);
        }

        card.append(choiceContainer);
        document.querySelector('.flashcard').append(card);
    }

    function shuffle(array) {
        return array;
    }
})();