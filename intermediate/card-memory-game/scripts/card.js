function init(array, difficult) {
    const cardImg = [...array, ...array];
    shuffle(cardImg);
    for (let i = 0; i < cardImg.length; i++) {
        const cards = document.querySelector('.cards');

        const cardScene = document.createElement('div');
        cardScene.setAttribute('class', 'card-scene-' + difficult);

        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.setAttribute('data-id', cardImg[i].id);

        const front = document.createElement('div');
        front.setAttribute('class', 'face front');
        const frontImg = document.createElement('img');
        frontImg.setAttribute('src', cardImg[i].path);
        frontImg.setAttribute('class', 'img-' + difficult);

        const back = document.createElement('div');
        back.setAttribute('class', 'face back bg-light');

        front.append(frontImg);
        card.append(front);
        card.append(back);
        cardScene.append(card)
        cards.append(cardScene);
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}