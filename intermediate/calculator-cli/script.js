window.addEventListener('click', function() {
    this.document.querySelector('input').focus();
});

document.querySelector('input').addEventListener('keyup', function(e) {
    if(e.which === 13) { execute(); }
});

function execute() {
    const input = document.querySelector('input');
    const commands = document.querySelector('.commands');
    
    commands.appendChild(cloneCommand(input.value));
    commands.appendChild(resultCommand(input.value));

    input.value = '';
}

function cloneCommand(command) {
    const p = document.createElement('p');
    const span = document.createElement('span');
    span.appendChild(document.createTextNode('$ '));
    p.textContent = command;
    p.prepend(span);
    return p;
}

function resultCommand(command) {
    const p = document.createElement('p');
    p.setAttribute('class', 'm-0');
    p.textContent = '> ' + command + ': command not found';
    return p;
}