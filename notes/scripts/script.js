document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const input = formData.get('input');

    const date = new Date();
    const card = new Card(input, date);

    document.querySelector('.cards').prepend(card.getCard);
});
