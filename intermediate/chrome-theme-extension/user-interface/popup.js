document.querySelector('#night').addEventListener('click', nightMode);

function nightMode() {
    chrome.tabs.insertCSS(null, {
        file: 'content-scripts/content.css'
    });
    chrome.tabs.executeScript(null, {
        file: 'content-scripts/content.js'
    });
}