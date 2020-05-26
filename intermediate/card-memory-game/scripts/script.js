init(hardSvg, 'hard')
function init(array, difficult) {
    const cardImg = [...array, ...array];
    shuffle(cardImg);
    for (let i = 0; i < cardImg.length; i++) {
        const cards = document.querySelector('.cards');

        const card = document.createElement('div');
        card.setAttribute('class', 'card card-' + difficult);
        const img = document.createElement('img');
        img.setAttribute('class', 'img-' + difficult);
        img.setAttribute('src', cardImg[i]);

        card.append(img);
        cards.append(card);
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}