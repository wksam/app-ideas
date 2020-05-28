document.querySelector('form').addEventListener('submit', submitApiKey);

function submitApiKey() {

}

getOrganizations();
function getOrganizations(nextOrgId = 1) {
    if(api.apikey === undefined) getApiKey();
    api.getOrganizations(nextOrgId);
}

function getApiKey() {
    try {
        api.apikey = config.APIKEY;
    } catch (error) {
        document.querySelector('form').hidden = false;
        document.querySelector('.alert').hidden = false;
    }
}

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
        const img = document.createElement('img');
        img.setAttribute('src', d.logoUrl);
        img.setAttribute('class', 'card-img');
        img.setAttribute('alt', 'Logo');
        imgContainer.append(img);
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