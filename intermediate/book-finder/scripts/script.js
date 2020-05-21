document.querySelector('form').addEventListener('submit', search);

function search(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    console.log(formData.get('search'), formData.get('term'));
}