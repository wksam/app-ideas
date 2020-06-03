(function() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = 'https://unicode.org/emoji/charts/full-emoji-list.html#smileys_&_emotion';

    fetch(proxyurl + url).then(response => response.text())
        .then(content => convertToHTML(content))
        .then(page => page.querySelector('table'))
        .then(table => convertToJSON(table));
})();

function convertToHTML(text) {
    const html = document.createElement('div');
    html.innerHTML = text;
    return html;
}

const vendors = { 0: 'appl', 1: 'goog', 2: 'fb', 3: 'wind', 4: 'twtr', 5: 'joy', 6: 'sams', 7: 'gmail', 8: 'sb', 9: 'dcm', 10: 'kddi', 11: 'sample', 12: 'eped' };
function convertToJSON(table) {
    const rows = table.querySelectorAll('tr');
    const obj = {};
    for (const row of rows) {
        if(row.querySelectorAll('td').length === 0) continue;

        const name = row.querySelector('td.name').textContent;
        const browser = { browser: row.querySelector('td.chars').textContent }
        obj[name] = browser;

        const imgs = row.querySelectorAll('td.andr');
        for (let i = 0; i < imgs.length; i++) {
            if(imgs[i].querySelectorAll('img').length === 1) {
                obj[name][vendors[i]] = imgs[i].querySelector('img').src;
            } else if(imgs[i].querySelectorAll('img').length > 1) {
                const arrayImgs = Array.from(imgs[i].querySelectorAll('img'))
                for (const item of arrayImgs) {
                    const key = item.title.split(' ')[0].replace(/[\[\]]/g, '').toLowerCase();
                    obj[name][key] = item.src;
                }
            } else {
                obj[name][vendors[i]] = imgs[i].textContent;
            }
        }
    }
    document.body.append(JSON.stringify(obj));
}