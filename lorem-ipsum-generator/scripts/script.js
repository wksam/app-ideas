// const lipsum = new Lipsum();
// document.querySelector('textarea').value = lipsum.randomParagraphs(3);

document.querySelector('form').addEventListener('submit', (e) => {
    const formData = new FormData(e.target);
    const paragraph = formData.get('paragraph');

    const lipsum = new Lipsum();
    document.querySelector('textarea').value = lipsum.randomParagraphs(paragraph);

    e.target.querySelector('input').value = '';

    e.preventDefault();
})