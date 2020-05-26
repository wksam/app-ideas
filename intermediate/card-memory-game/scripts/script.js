document.querySelectorAll('.card').forEach(function(card) {
    card.addEventListener('click', flip);
});

function flip(e) {
    e.target.closest('.card').classList.add('flip');
}