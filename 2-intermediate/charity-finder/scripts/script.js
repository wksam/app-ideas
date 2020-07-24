document.querySelector('form').addEventListener('submit', submitApiKey);

function submitApiKey(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    api.apikey = formData.get('key');
    hideForm();
    init();
}

init();
function init() {
    if(api.apikey === undefined) getApiKey();
    getOrganizations();
}

function getOrganizations(nextOrgId = 1) {
    startLoading();
    api.fetchOrganizations(nextOrgId);
}

function getApiKey() {
    try {
        api.apikey = config.APIKEY;
    } catch (error) {
        showForm();
    }
}

function showForm() {
    document.querySelector('form').hidden = false;
    document.querySelector('.alert').hidden = false;
    document.querySelector('.pagination').hidden = true;
}

function hideForm() {
    document.querySelector('form').hidden = true;
    document.querySelector('.alert').hidden = true;
}

function startLoading() {
    document.querySelector('.organizations').textContent = '';
    document.querySelector('div[role=status]').hidden = false;
    disablePagination();
}

function endLoading() {
    document.querySelector('div[role=status]').hidden = true;
}

const noPhotoPlaceholder = 'https://via.placeholder.com/200?text=No+photo';
function fillOrganizations(data) {
    const container = document.querySelector('.organizations');
    container.textContent = '';

    for (const d of data) {
        const card = document.createElement('div');
        card.setAttribute('class', 'organization card mb-3');
    
        const row = document.createElement('div');
        row.setAttribute('class', 'row no-gutters');

        const imgContainer = document.createElement('div');
        imgContainer.setAttribute('class', 'col-md-2');
        const imgLink = document.createElement('a');
        imgLink.setAttribute('href', d.url);
        imgLink.setAttribute('target', '_blank');
        const img = document.createElement('img');
        img.setAttribute('src', d.logoUrl != null ? d.logoUrl : noPhotoPlaceholder);
        img.setAttribute('class', 'card-img');
        img.setAttribute('alt', 'Logo');
        imgLink.append(img);
        imgContainer.append(imgLink);
        row.append(imgContainer);

        const bodyContainer = document.createElement('div');
        bodyContainer.setAttribute('class', 'col-md-10');
        const cardBody = document.createElement('div');
        cardBody.setAttribute('class', 'card-body');
        
        const cardTitle = document.createElement('h5');
        cardTitle.setAttribute('class', 'card-title');
        const idContainer = document.createElement('span');
        idContainer.setAttribute('class', 'badge badge-secondary float-right');
        idContainer.textContent = 'Id: ' + d.id;
        cardTitle.textContent = d.name + ' ';
        cardTitle.append(idContainer);
        cardBody.append(cardTitle);

        const cardText = document.createElement('p');
        cardText.setAttribute('class', 'card-text');
        cardText.textContent = d.mission;
        cardBody.append(cardText);

        const cardFooter = document.createElement('p');
        cardFooter.setAttribute('class', 'card-text');
        const textMuted = document.createElement('small');
        textMuted.setAttribute('class', 'text-muted');
        textMuted.textContent = d.addressLine1 + ' - ' + d.city + ', ' + d.state + ', ' + d.country;
        cardFooter.append(textMuted);
        cardBody.append(cardFooter);

        bodyContainer.append(cardBody);
        row.append(bodyContainer);
        card.append(row);
        container.append(card);
    }
}