const LIMIT = 10;

document.querySelector('form').addEventListener('submit', search);

function search(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    e.target.reset();
    api.fetchSearch(formData.get('search') + ':' + formData.get('term'), 0, LIMIT);
}

function fillCards(books) {
    const bookContainer = document.querySelector('.books');
    bookContainer.textContent = '';

    for (const book of books) {
        const card = createElement('div', [{ name: 'class', value: 'card mt-3' }]);
        const row = createElement('div', [{ name: 'class', value: 'row no-gutters' }]);
        
        if(book.volumeInfo.imageLinks !== undefined && book.volumeInfo.imageLinks.thumbnail !== undefined) {
            const img = createElement('div', [{ name: 'class', value: 'col-md-2' }]);
            img.appendChild(createElement('img', [{ name: 'src', value: book.volumeInfo.imageLinks.thumbnail }, { name: 'alt', value: 'Thumbnail' }, { name: 'class', value: 'card-img' }]));
            row.appendChild(img);
        }

        const cbody = createElement('div', [{ name: 'class', value: 'card-body' }]);

        if(book.volumeInfo.title !== undefined) {
            const title = createElement('h5', [{ name: 'class', value: 'card-title' }]);
            title.appendChild(createTextNode(book.volumeInfo.title));
            cbody.appendChild(title);
        }

        if(book.volumeInfo.subtitle !== undefined) {
            const subtitle = createElement('h6', [{ name: 'class', value: 'card-subtitle mb-2 text-muted' }]);
            subtitle.appendChild(createTextNode(book.volumeInfo.subtitle));
            cbody.appendChild(subtitle);
        }

        if(book.volumeInfo.authors !== undefined) {
            const authors = createElement('p', [{ name: 'class', value: 'card-text m-0' }]);
            const strong = createElement('strong', []);
            strong.appendChild(createTextNode(book.volumeInfo.authors.length > 1 ? 'Authors: ' : 'Author: '));
            authors.appendChild(strong);
            authors.appendChild(createTextNode(book.volumeInfo.authors.join(', ')));
            cbody.appendChild(authors);
        }

        if(book.volumeInfo.publisher !== undefined) {
            const publisher = createElement('p', [{ name: 'class', value: 'card-text' }]);
            const strong = createElement('strong', []);
            strong.appendChild(createTextNode('Publisher: '));
            publisher.appendChild(strong);
            publisher.appendChild(createTextNode(book.volumeInfo.publisher));
            cbody.appendChild(publisher);
        }

        if(book.volumeInfo.description !== undefined) {
            const description = createElement('p', [{ name: 'class', value: 'card-text' }]);
            description.appendChild(createTextNode(book.volumeInfo.description));
            cbody.appendChild(description);
        }

        if(book.volumeInfo.infoLink !== undefined) {
            const infoLink = createElement('a', [{ name: 'href', value: book.volumeInfo.infoLink }, { name: 'class', value: 'card-link' }]);
            infoLink.appendChild(createTextNode('More Info'));
            cbody.appendChild(infoLink);
        }

        const cbodyContainer = createElement('div', [{ name: 'class', value: 'col-md-10' }]);
        cbodyContainer.appendChild(cbody);

        row.appendChild(cbodyContainer);
        card.appendChild(row);
        bookContainer.appendChild(card);
    }
}

function createElement(tag, props) {
    const elem = document.createElement(tag);
    for (const prop of props) {
        elem.setAttribute(prop.name, prop.value);
    }
    return elem;
}

function createTextNode(text) {
    return document.createTextNode(text);
}