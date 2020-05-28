document.querySelector('a[aria-label=Previous]').addEventListener('click', previous);
document.querySelector('a[aria-label=Next]').addEventListener('click', next);

function previous() {
    if(!api.hasPrevious) return;

    const id = api.getPreviousId();
    api.getOrganizations(id);
}

function next() {
    if(!api.hasNext) return;
    
    const id = api.getNextId();
    api.addOrganization(id);
    api.getOrganizations(id);
}

function updatePagination() {
    document.querySelector('.pagination').hidden = false;
    
    if(!api.hasNext) document.querySelector('a[aria-label=Next]').parentElement.classList.add('disabled');
    else document.querySelector('a[aria-label=Next]').parentElement.classList.remove('disabled');

    if(!api.hasPrevious) document.querySelector('a[aria-label=Previous]').parentElement.classList.add('disabled');
    else document.querySelector('a[aria-label=Previous]').parentElement.classList.remove('disabled');
}