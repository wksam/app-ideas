window.onkeydown = (e) => {
    if(!e.repeat){
        e.preventDefault();

        addOnPanel('key', e.keyCode);
        addOnPanel('value', e.key);

        keyState('shift', e.shiftKey);
        keyState('ctrl', e.ctrlKey);
        keyState('alt', e.altKey);
        keyState('meta', e.metaKey);
    }
}

window.onkeyup = (e) => {
    if(!e.repeat){
        e.preventDefault();

        keyState('shift', e.shiftKey);
        keyState('ctrl', e.ctrlKey);
        keyState('alt', e.altKey);
        keyState('meta', e.metaKey);
    }
}

function keyState(key, state) {
    const ctrl = document.getElementById(key);
    if(state) ctrl.classList.add('active');
    else ctrl.classList.remove('active');
    ctrl.setAttribute('aria-pressed', state);
    ctrl.disabled = !state;
}

function addOnPanel(whichPanel, message) {
    const panel = document.getElementById(whichPanel + '-panel');
    panel.value = message + '\n' + panel.value;
}