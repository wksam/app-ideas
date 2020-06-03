(function() {
    const choiceLetter = { 0: 'a) ', 1: 'b) ', 2: 'c) ', 3: 'd) ' };

    function getFlashCard() {

    }

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