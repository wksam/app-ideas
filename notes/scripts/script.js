document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const input = formData.get('input');

    const date = new Date();
    const card = new Card(input, date);

    document.querySelector('.cards').prepend(card.getCard);

    document.querySelector('textarea').value = '';
});

function editCard() {
    const id = this.closest('.card').dataset.id;
    const text = this.closest('.card-body').firstElementChild.textContent;
    const textarea = document.querySelector('textarea');
    textarea.value = text;
    textarea.dataset.id = id;
}

function deleteCard() {
    this.closest('.card').remove();
}