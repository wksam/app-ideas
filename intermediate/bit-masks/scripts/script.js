document.querySelector('form').addEventListener('submit', search);

function search(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const cities = findCities(parseInt(formData.get('gmt')));
    
    const alert = document.querySelector('.alert');
    alert.hidden = false;
    alert.textContent = cities.length != 0 ? cities.join(', ') : 'Not found';

    console.log(cities)
}

function findCities(selected) {
    const flag = 1 << (12 + selected);
    return CITIES.filter(([city, offset]) => offset === flag).map(([city, offset]) => city);
}