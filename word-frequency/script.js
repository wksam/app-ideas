document.querySelector('#input').addEventListener('input', onInput);

function onInput(e) {
    e.target.value = e.target.value.substring(0, 2048);
    document.querySelector('.count').textContent = this.value.length;
}